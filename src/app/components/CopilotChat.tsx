import { Bot, X, Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const suggestions = [
  "Quanto posso gastar hoje?",
  "Quando devo pagar o DAS MEI?",
  "Como separar salário do lucro?",
  "Estou no lucro esse mês?",
];

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "bot",
    text: "Olá, Lucas! Sou o seu Copiloto financeiro 🚀\n\nPosso te ajudar a entender melhor suas finanças, separar conta pessoal da do negócio, e tomar decisões mais seguras. Como posso ajudar hoje?",
  },
];

const botReplies: Record<string, string> = {
  "Quanto posso gastar hoje?":
    "Com base nas suas entradas e saídas de hoje, seu limite seguro é de **R$ 45,00**. Você já gastou R$ 27,50, então ainda tem uma boa margem! 💚",
  "Quando devo pagar o DAS MEI?":
    "O DAS MEI vence todo dia **20 de cada mês**. O próximo vencimento é dia 20/06. O valor é R$ 75,90 (INSS + ISS). Quer que eu te lembre antes?",
  "Como separar salário do lucro?":
    "Ótima pergunta! Uma regra simples: defina um **pró-labore fixo** para você (ex: R$ 2.000/mês) e só transfira esse valor para sua conta pessoal. O restante fica na conta do negócio para custos e reserva.",
  "Estou no lucro esse mês?":
    "Sim! 🎉 Seus ganhos na conta do negócio foram **R$ 12.400,00** e seus custos foram R$ 4.084,80. Seu resultado é positivo em **R$ 8.315,20** — um ótimo mês!",
};

interface CopilotChatProps {
  onClose: () => void;
}

export function CopilotChat({ onClose }: CopilotChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { id: Date.now(), role: "user", text };
    const reply = botReplies[text] ?? "Entendido! Vou analisar suas informações e te dar uma resposta precisa em instantes. 🤖";
    const botMsg: Message = { id: Date.now() + 1, role: "bot", text: reply };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  };

  return (
    <div
      className="fixed bottom-24 right-6 w-80 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)", height: 440 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: "var(--navy)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--mint)" }}
        >
          <Bot size={15} style={{ color: "var(--navy)" }} />
        </div>
        <div className="flex-1">
          <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "white" }}>Copiloto IA</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>Online agora</p>
          </div>
        </div>
        <button onClick={onClose}>
          <X size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && (
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5"
                style={{ background: "var(--mint-dim)" }}
              >
                <Sparkles size={11} style={{ color: "var(--mint)" }} />
              </div>
            )}
            <div
              className="max-w-56 px-3 py-2 rounded-xl"
              style={{
                background: msg.role === "user" ? "var(--navy)" : "var(--background)",
                color: msg.role === "user" ? "white" : "var(--navy)",
                fontSize: "0.78rem",
                lineHeight: 1.5,
                borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              }}
            >
              {msg.text.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-3 py-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="px-2.5 py-1 rounded-full transition-all hover:opacity-80"
              style={{ background: "var(--mint-dim)", color: "var(--mint)", fontSize: "0.68rem", fontWeight: 500, border: "1px solid rgba(0,200,150,0.2)" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte algo..."
          className="flex-1 outline-none bg-transparent"
          style={{ fontSize: "0.78rem", color: "var(--navy)" }}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
          style={{ background: "var(--mint)" }}
        >
          <Send size={13} style={{ color: "var(--navy)" }} />
        </button>
      </form>
    </div>
  );
}
