import { brand } from "@/lib/content";

export const dynamic = "force-dynamic";

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const company = (body.company ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const subject = (body.subject ?? "General inquiry").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — contact form submission was not sent.");
    return Response.json({ error: "Email delivery is not configured yet." }, { status: 500 });
  }

  // Sender address the email is delivered "from". Must be on a domain verified with Resend.
  // Falls back to Resend's shared sandbox sender if no verified domain is set yet.
  const fromAddress = process.env.CONTACT_FROM_EMAIL || "Zetta Metrics <onboarding@resend.dev>";

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    message,
  ];

  const htmlRows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "Not provided"],
    ["Phone", phone || "Not provided"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#667085;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:4px 0;color:#101828;font-size:14px;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="font-size:18px;color:#101828;margin:0 0 16px;">New message — ${escapeHtml(subject)}</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">${htmlRows}</table>
    <p style="font-size:13px;color:#667085;margin:0 0 6px;">Message</p>
    <p style="font-size:14px;color:#101828;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [brand.email],
        reply_to: email,
        subject: `Zetta Metrics — ${subject}`,
        text: textLines.join("\n"),
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend send failed:", res.status, errText);
      return Response.json({ error: "We couldn't send your message. Please try again in a moment." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request error:", err);
    return Response.json({ error: "We couldn't send your message. Please try again in a moment." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
