"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, X } from "lucide-react";

const responses: Record<string, string> = {
  "why is supplier a risky?":
    "Supplier A is risky because recent delivery reliability has dropped, Component X dependency is high, and similar historical incidents caused production delays.",

  "show similar previous incidents":
    "A similar incident happened in March 2026 when Supplier A delivered Component X six days late. The successful response was shifting 35% of orders to Supplier B.",

  "what happens if supplier a is delayed 7 days?":
    "A 7-day delay could reduce production output, push Component X below safety stock, and create an estimated recovery delay of 3 to 4 days.",

  "how can we prevent the component x shortage?":
    "Shift 30 to 35% of Component X demand to Supplier B, increase short-term buffer stock, and monitor the stockout countdown.",
};

export default function AICopilot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "Hi, I’m SupplyMind Copilot. Ask me about risks, incidents, forecasts, or crisis scenarios.",
    },
  ]);

  const sendMessage = (question?: string) => {
    const finalQuestion = (question ?? input).trim();

    if (!finalQuestion) return;

    const key = finalQuestion.toLowerCase();

    const answer =
      responses[key] ??
      "I can analyze this using SupplyMind's risk, memory, forecast, and crisis data. Try asking about Supplier A, Component X, or a previous incident.";

    setMessages((prev) => [
      ...prev,
      { role: "user", text: finalQuestion },
      { role: "assistant", text: answer },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-white shadow-lg"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/50">
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#070B16]">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-2">
                  <Bot className="h-5 w-5 text-violet-300" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    SupplyMind Copilot
                  </p>
                  <p className="text-xs text-slate-500">
                    Operational intelligence assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "ml-10 rounded-2xl bg-cyan-400/10 p-3 text-sm text-slate-200"
                        : "mr-10 rounded-2xl bg-white/5 p-3 text-sm text-slate-300"
                    }
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Try these
                </p>

                {[
                  "Why is Supplier A risky?",
                  "Show similar previous incidents",
                  "What happens if Supplier A is delayed 7 days?",
                  "How can we prevent the Component X shortage?",
                ].map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => sendMessage(question)}
                    className="block w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/[0.06]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask SupplyMind..."
                  className="border-white/10 bg-white/5 text-white"
                />

                <Button
                  type="button"
                  onClick={() => sendMessage()}
                  className="bg-cyan-400 text-black hover:bg-cyan-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}