import { Bot, Sparkles, BookOpen, Stethoscope, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const glossary = [
  { term: "Pró-labore", def: "O 'salário' que o dono do negócio paga para si mesmo. Deve ser fixo e separado do lucro." },
  { term: "DAS MEI", def: "Guia mensal obrigatória para MEI. Cobre INSS + ISS ou ICMS. Vence todo dia 20." },
  { term: "Fluxo de caixa", def: "O controle de tudo que entrou e saiu do dinheiro no seu negócio num período." },
  { term: "Margem de lucro", def: "Quanto sobra depois de pagar todos os custos. Se você fatura R$ 10 e gasta R$ 6, sua margem é 40%." },
  { term: "Reserva de emergência", def: "Dinheiro guardado para imprevistos. O ideal é ter de 3 a 6 meses de gastos essenciais." },
];

const diagnoses = [
  { label: "Separação de finanças", status: "ok", detail: "Você está usando contas separadas. Ótimo!" },
  { label: "Reserva de emergência", status: "warn", detail: "60% da meta atingida. Continue!" },
  { label: "Controle de gastos diários", status: "ok", detail: "Você registrou 5 lançamentos esta semana." },
  { label: "Pagamento do DAS MEI", status: "alert", detail: "Vence em 11 dias. Separe R$ 75,90 agora." },
];

const statusColor: Record<string, string> = { ok: "var(--mint)", warn: "#f59e0b", alert: "#ef4444" };
const statusLabel: Record<string, string> = { ok: "OK", warn: "Atenção", alert: "Urgente" };

interface Message { id: number; role: "user" | "bot"; text: string; }

const botReplies: Record<string, string> = {
  "O que é pró-labore?": "Pró-labore é o valor fixo que você, como dono do negócio, paga para si mesmo mensalmente — funciona como um salário. É diferente do lucro! Defina um valor sustentável e transfira apenas esse valor para sua conta pessoal.",
  "Como funciona o DAS MEI?": "O DAS MEI é uma guia mensal que você deve pagar até o dia 20. Ela cobre seu INSS (para aposentadoria), mais ISS se você presta serviços ou ICMS se você vende produtos. O valor atual é R$ 75,90.",
};

export function CopilotoPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Olá! Sou o Copiloto IA do FinStart. Estou aqui para te ajudar a entender suas finanças e tomar decisões mais seguras. O que você gostaria de saber?" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text: string) => {
    const reply = botReplies[text] ?? "Entendido! Vou analisar suas informações e responder em instantes. 🤖";
    setMessages((p) => [
      ...p,
      { id: Date.now(), role: "user", text },
      { id: Date.now() + 1, role: "bot", text: reply },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--navy)" }}>Copiloto</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
          Central de IA financeira — diagnóstico, glossário e consultas
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chat */}
        <div
          className="xl:col-span-2 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "var(--card)", border: "1px solid var(--border)", height: 480 }}
        >
          <div
            className="flex items-center gap-3 px-5 py-4 border-b"
            style={{ background: "var(--navy)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--mint)" }}>
              <Bot size={15} style={{ color: "var(--navy)" }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "white" }}>Copiloto IA</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--mint-dim)" }}>
                    <Sparkles size={12} style={{ color: "var(--mint)" }} />
                  </div>
                )}
                <div
                  className="max-w-xs px-4 py-2.5 rounded-2xl"
                  style={{
                    background: msg.role === "user" ? "var(--navy)" : "var(--background)",
                    color: msg.role === "user" ? "white" : "var(--navy)",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {["O que é pró-labore?", "Como funciona o DAS MEI?"].map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="px-3 py-1 rounded-full"
                style={{ background: "var(--mint-dim)", color: "var(--mint)", fontSize: "0.72rem", fontWeight: 500 }}
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (input.trim()) send(input.trim()); }}
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre suas finanças..."
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "0.82rem" }}
            />
            <button type="submit" disabled={!input.trim()} className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-30" style={{ background: "var(--mint)" }}>
              <Send size={14} style={{ color: "var(--navy)" }} />
            </button>
          </form>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Diagnóstico */}
          <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope size={16} style={{ color: "var(--navy)" }} />
              <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)" }}>Diagnóstico rápido</p>
            </div>
            <div className="flex flex-col gap-2">
              {diagnoses.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: "var(--background)" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: statusColor[d.status] }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--navy)" }}>{d.label}</p>
                      <span style={{ fontSize: "0.62rem", color: statusColor[d.status], fontWeight: 600 }}>{statusLabel[d.status]}</span>
                    </div>
                    <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: 1 }}>{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glossário */}
          <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} style={{ color: "var(--navy)" }} />
              <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)" }}>Glossário financeiro</p>
            </div>
            <div className="flex flex-col gap-2">
              {glossary.slice(0, 3).map((g) => (
                <div key={g.term} className="p-2.5 rounded-xl" style={{ background: "var(--background)" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>{g.term}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{g.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
