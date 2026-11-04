import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmail, siteName } from "@/lib/site-seo";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

const toAddress = process.env.CONTACT_TO_EMAIL ?? contactEmail;

/** Resend test sender — works without a verified domain. */
const DEFAULT_FROM = `${siteName} <onboarding@resend.dev>`;

/**
 * Custom "from" only when using a verified domain in Resend.
 * Ignores CONTACT_FROM_EMAIL if it points at Gmail etc. (common misconfiguration).
 */
function resolveFromAddress(): string {
  const custom = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!custom) return DEFAULT_FROM;

  const emailPart = custom.includes("<")
    ? custom.slice(custom.indexOf("<") + 1, custom.indexOf(">")).trim()
    : custom.trim();

  if (emailPart.endsWith("@resend.dev")) return custom;
  if (process.env.RESEND_DOMAIN_VERIFIED === "true") return custom;

  return DEFAULT_FROM;
}

function buildEmailBody(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  const companyLine = data.company?.trim()
    ? `Company: ${data.company.trim()}\n`
    : "";

  const text = [
    `New message from the ${siteName} website contact form.`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    companyLine,
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p>New message from the <strong>${siteName}</strong> contact form.</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.company?.trim() ? `<p><strong>Company:</strong> ${escapeHtml(data.company.trim())}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `.trim();

  return { text, html };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatReplyTo(name: string, email: string): string {
  const safeName = name.replace(/"/g, "").trim();
  return safeName ? `"${safeName}" <${email}>` : email;
}

export async function POST(request: Request) {
  let json: Body;
  try {
    json = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = json.name?.trim();
  const email = json.email?.trim();
  const company = json.company?.trim();
  const message = json.message?.trim();

  if (!name || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please add a short message (10+ characters)." },
      { status: 400 },
    );
  }
  if (message.length > 8000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] (no RESEND_API_KEY — logged only)", {
        name,
        email,
        company,
        message,
      });
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const { text, html } = buildEmailBody({ name, email, company, message });
  const resend = new Resend(apiKey);
  const from = resolveFromAddress();

  const { error } = await resend.emails.send({
    from,
    to: [toAddress],
    replyTo: formatReplyTo(name, email),
    subject: `[${siteName}] Contact from ${name}`,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message, {
      from,
      to: toAddress,
    });
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
