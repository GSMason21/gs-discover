/**
 * api/submit.js — Vercel serverless function
 *
 * POST /api/subscribe
 * Body (from App.tsx): { name, email, title, organization, innovationScore, coherenceScore, persona, timestamp }
 *
 * Actions:
 *   1. Upsert contact into Mailchimp audience
 *   2. Write merge fields (name, job title, company, persona, scores)
 *   3. Apply persona tag + generic "Innovation Explorer" tag → triggers journey
 *
 * Env vars (set in Vercel project settings):
 *   MAILCHIMP_API_KEY        e.g. abc123-us21
 *   MAILCHIMP_SERVER_PREFIX  e.g. us21
 *   MAILCHIMP_AUDIENCE_ID    e.g. 17bb008ec3
 *   MAILCHIMP_TAG_NAME       optional, defaults to "Innovation Explorer"
 */

const crypto = require("crypto");

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
  // 400 "Member Exists" is fine for upsert — treat as success
  if (!res.ok && res.status !== 400) {
    throw new Error(`Mailchimp ${method} ${path} → ${res.status}: ${data.detail || data.title}`);
  }
  return { status: res.status, data };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    name,
    email,
    title,
    organization,
    innovationScore,
    coherenceScore,
    persona,
    timestamp,
  } = req.body;

  if (!email) return res.status(400).json({ error: "email is required" });

  const API_KEY  = process.env.MAILCHIMP_API_KEY;
  const SERVER   = process.env.MAILCHIMP_SERVER_PREFIX;
  const LIST_ID  = process.env.MAILCHIMP_AUDIENCE_ID;
  const TAG_NAME = process.env.MAILCHIMP_TAG_NAME || "Innovation Explorer";

  if (!API_KEY || !SERVER || !LIST_ID) {
    console.error("Missing Mailchimp env vars");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Split "First Last" → FNAME / LNAME
  const [firstName, ...rest] = (name || "").trim().split(" ");
  const lastName = rest.join(" ");

  const subscriberHash = md5(email);

  try {
    // ── 1. Upsert member ────────────────────────────────────────────────────
    await mailchimpRequest(
      "PUT",
      `/lists/${LIST_ID}/members/${subscriberHash}`,
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME:    firstName   || "",
          LNAME:    lastName    || "",
          JOBTITLE: title       || "",
          COMPANY:  organization|| "",
          PERSONA:  persona     || "",
          // Store scores for segmentation / personalisation in email templates
          // Add INNO_SCORE and COH_SCORE as Number merge fields in Mailchimp if you want these
          // INNO_SCORE: innovationScore ?? "",
          // COH_SCORE:  coherenceScore  ?? "",
        },
      },
      API_KEY, SERVER
    );

    // ── 2. Apply tags ───────────────────────────────────────────────────────
    // persona tag format: "Persona: The Wayfinder" — matches their original logic
    await mailchimpRequest(
      "POST",
      `/lists/${LIST_ID}/members/${subscriberHash}/tags`,
      {
        tags: [
          { name: TAG_NAME,            status: "active" },
          { name: `Persona: ${persona}`, status: "active" },
        ],
      },
      API_KEY, SERVER
    );

    // ── 3. Add note with full context ───────────────────────────────────────
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
