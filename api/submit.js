import crypto from "crypto";

function md5(str) {
  return crypto.createHash("md5").update(str.toLowerCase()).digest("hex");
}

async function mailchimpRequest(method, path, body, apiKey, server) {
  const url = `https://${server}.api.mailchimp.com/3.0${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok && res.status !== 400) {
    throw new Error(`Mailchimp ${method} ${path} → ${res.status}: ${data.detail || data.title}`);
  }
  return { status: res.status, data };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Parse body manually for Vercel serverless
  let parsed;
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    parsed = JSON.parse(Buffer.concat(chunks).toString());
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { name, email, title, organization, innovationScore, coherenceScore, persona, timestamp } = parsed;

  if (!email) return res.status(400).json({ error: "email is required" });

  const API_KEY  = process.env.MAILCHIMP_API_KEY;
  const SERVER   = process.env.MAILCHIMP_SERVER_PREFIX;
  const LIST_ID  = process.env.MAILCHIMP_AUDIENCE_ID;
  const TAG_NAME = process.env.MAILCHIMP_TAG_NAME || "Innovation Explorer";

  if (!API_KEY || !SERVER || !LIST_ID) {
    console.error("Missing Mailchimp env vars");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const [firstName, ...rest] = (name || "").trim().split(" ");
  const lastName = rest.join(" ");
  const subscriberHash = md5(email);

  try {
    await mailchimpRequest(
      "PUT",
      `/lists/${LIST_ID}/members/${subscriberHash}`,
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME:    firstName    || "",
          LNAME:    lastName     || "",
          JOBTITLE: title        || "",
          COMPANY:  organization || "",
          PERSONA:  persona      || "",
        },
      },
      API_KEY, SERVER
    );

    await mailchimpRequest(
      "POST",
      `/lists/${LIST_ID}/members/${subscriberHash}/tags`,
      {
        tags: [
          { name: TAG_NAME,              status: "active" },
          { name: `Persona: ${persona}`, status: "active" },
        ],
      },
      API_KEY, SERVER
    );

    await mailchimpRequest(
      "POST",
      `/lists/${LIST_ID}/members/${subscriberHash}/notes`,
      {
        note: `Innovation Explorer Quiz\nPersona: ${persona}\nInnovation Score: ${innovationScore}/5\nCoherence Score: ${coherenceScore}/5\nSubmitted: ${timestamp || new Date().toISOString()}`,
      },
      API_KEY, SERVER
    ).catch(err => console.warn("Note creation failed (non-fatal):", err.message));

    return res.status(200).json({ result: "success" });

  } catch (err) {
    console.error("Mailchimp error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
