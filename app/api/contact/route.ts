import { NextResponse } from "next/server";

// Contact intake endpoint, built to be CRM-agnostic and drop-in ready for GoHighLevel
// (or any other webhook-based CRM) later:
//
//   1. Set CRM_WEBHOOK_URL in the Vercel project's environment variables to a
//      GoHighLevel "Inbound Webhook" URL (Settings → Integrations → Webhooks, or a
//      workflow's webhook trigger).
//   2. Every submission below is forwarded to it as JSON, no code changes required.
//
// Until that env var is set, submissions are simply logged server-side (visible in
// Vercel's function logs) so nothing is silently lost — this keeps the form fully
// functional today with zero vendor lock-in, and one-env-var-away from GHL.

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /\S+@\S+\.\S+/.test(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a name, valid email, and message." },
      { status: 400 }
    );
  }

  const payload = {
    source: "shyam-mallesh-site",
    submittedAt: new Date().toISOString(),
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
    interest: body.interest ?? "",
    message: body.message,
  };

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("CRM webhook responded with an error:", res.status, await res.text());
        return NextResponse.json(
          { ok: false, error: "We couldn't submit your message right now. Please try again shortly." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("CRM webhook forward failed:", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't submit your message right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } else {
    console.log("Contact form submission (no CRM_WEBHOOK_URL configured yet):", payload);
  }

  return NextResponse.json({ ok: true });
}
