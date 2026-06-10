import { createHash } from "crypto";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch(e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  if (!body) return res.status(400).json({ error: "Empty request body" });

  const { name, email, title, org, persona, innovationScore, coherenceScore } = body;
  if (!email || !name) return res.status(400).json({ error: "Name and email are required" });

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !SERVER || !AUDIENCE_ID) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "";
  const emailLower = email.toLowerCase().trim();
  const emailHash = createHash("md5").update(emailLower).digest("hex");
  const authHeader = "Basic " + btoa("anystring:" + API_KEY);
  const baseUrl = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const upsertRes = await fetch(`${baseUrl}/${encodeURIComponent(emailLower)}`, {
      method: "PUT",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: emailLower,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          TITLE: title || "",
          ORG: org || "",
          PERSONA: persona || "",
          INNO_SCORE: String(innovationScore ?? ""),
          COH_SCORE: String(coherenceScore ?? ""),
        },
      }),
    });

    const upsertData = await upsertRes.json();
    if (!upsertRes.ok) {
      return res.status(500).json({ error: upsertData.detail || "Failed to add subscriber", detail: upsertData });
    }

    const tagRes = await fetch(`${baseUrl}/${emailHash}/tags`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        tags: [
          { name: "Explorer Assessment", status: "active" },
          { name: `Persona: ${persona}`, status: "active" },
        ],
      }),
    });

    if (!tagRes.ok) {
      const tagData = await tagRes.json();
      return res.status(500).json({ error: "Member added but tagging failed", detail: tagData });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}
