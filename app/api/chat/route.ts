import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/systemPrompt";

// The chatbot's "learning" mechanism: buildSystemPrompt() reads data/site.ts,
// data/listings.ts, data/faq.ts, and data/testimonials.ts fresh on every request. Edit
// any of those files (add a listing, update the bio, add a testimonial), push, and the
// very next message this endpoint answers reflects the change — no re-training, no
// separate index to rebuild.

type ChatMessage = { role: "user" | "assistant"; content: string };

const MODEL = process.env.ANTHROPIC_CHAT_MODEL || "claude-haiku-4-5-20251001";
const MAX_HISTORY = 12;

function isValidMessages(body: unknown): body is { messages: ChatMessage[] } {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.messages) &&
    b.messages.every(
      (m) =>
        m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!isValidMessages(body)) {
    return NextResponse.json({ ok: false, error: "Invalid message format." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      reply:
        "Thanks for the question! The AI assistant isn't fully connected yet — please use the Contact page and your message will go straight through.",
    });
  }

  const messages = body.messages.slice(-MAX_HISTORY);

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: buildSystemPrompt(),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock && textBlock.type === "text"
        ? textBlock.text
        : "I wasn't able to put that into words just now — could you try rephrasing?";

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("Chat completion failed:", err);
    return NextResponse.json({
      ok: true,
      reply:
        "Sorry, I'm having trouble answering right now. Please try again in a moment, or reach out directly on the Contact page.",
    });
  }
}
