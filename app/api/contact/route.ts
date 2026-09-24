// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientKey = forwardedFor || "unknown";
    const now = Date.now();
    const current = attempts.get(clientKey);

    if (!current || current.resetAt <= now) {
      attempts.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else if (current.count >= RATE_LIMIT_MAX) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    } else {
      current.count += 1;
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== "object") {
      return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim() : "";
    const message = typeof input.message === "string" ? input.message.trim() : "";
    const company = typeof input.company === "string" ? input.company : "";

    // Honeypot (ignore bots quietly)
    if (company) return Response.json({ ok: true });

    if (!name || !EMAIL_PATTERN.test(email) || !message || name.length > 100 || email.length > 254 || message.length > 5000) {
      return Response.json({ ok: false, error: "Please check the submitted fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    if (!apiKey || !to || !from) {
      console.error("Contact form email service is not configured");
      return Response.json({ ok: false, error: "Contact service unavailable" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const recipients = to
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    // Resend SDK returns { data, error }
    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: email,
      subject: `Portfolio contact — ${name.replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          <hr/>
          <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend contact error", error);
      return Response.json({ ok: false, error: "Unable to send message" }, { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch (e: unknown) {
    console.error("contact error", e);
    return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
