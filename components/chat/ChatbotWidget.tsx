"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: `Hi, I'm the assistant for ${site.agentName}'s site. Ask me about current listings, the buying process, or estimating a monthly payment.`,
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const json = await res.json();
      const reply: string =
        json.reply ?? "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong reaching the assistant. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-card px-5 py-4">
                <div>
                  <div className="font-display text-base text-bone">
                    {site.agentName}
                  </div>
                  <div className="text-xs text-bone/50">AI Assistant</div>
                </div>
                <button
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="text-bone/50 transition-colors hover:text-brass"
                >
                  ✕
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "ml-auto bg-brass text-ink"
                        : "bg-ink/60 text-bone/90"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && (
                  <div className="max-w-[85%] rounded-2xl bg-ink/60 px-4 py-2.5 text-sm text-bone/50">
                    <span className="inline-flex gap-1">
                      <Dot delay={0} />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </span>
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="field flex-1 py-2.5"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="btn-primary px-4 py-2.5 disabled:opacity-50"
                    aria-label="Send"
                  >
                    →
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? "Close chat" : "Open chat"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105"
        >
          {open ? (
            <span className="text-xl">✕</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.button>
      </div>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-bone/50"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
