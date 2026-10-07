import { X, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface QuickEntryModalProps {
  onClose: () => void;
}

export function QuickEntryModal({ onClose }: QuickEntryModalProps) {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState<"personal" | "business">("personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,22,40,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--card)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy)" }}>
              Registrar entrada ou saída
            </h2>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", marginTop: 2 }}>
              Mantenha suas finanças organizadas
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X size={16} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Type selector */}
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--navy)", display: "block", marginBottom: 8 }}>
              Tipo de movimentação
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("income")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all border-2"
                style={{
                  borderColor: type === "income" ? "var(--mint)" : "var(--border)",
                  background: type === "income" ? "var(--mint-dim)" : "transparent",
                  color: type === "income" ? "var(--mint)" : "var(--muted-foreground)",
                  fontWeight: type === "income" ? 600 : 400,
                  fontSize: "0.82rem",
                }}
              >
                <ArrowDownLeft size={15} />
                Entrada
              </button>
              <button
                type="button"
                onClick={() => setType("expense")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all border-2"
                style={{
                  borderColor: type === "expense" ? "#ef4444" : "var(--border)",
                  background: type === "expense" ? "rgba(239,68,68,0.08)" : "transparent",
                  color: type === "expense" ? "#ef4444" : "var(--muted-foreground)",
                  fontWeight: type === "expense" ? 600 : 400,
                  fontSize: "0.82rem",
                }}
              >
                <ArrowUpRight size={15} />
                Saída
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--navy)", display: "block", marginBottom: 8 }}>
              Valor
            </label>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all focus-within:border-mint"
              style={{ borderColor: "var(--border)", background: "var(--background)" }}
            >
              <span style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", fontWeight: 600 }}>R$</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="flex-1 outline-none bg-transparent"
                style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)" }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--navy)", display: "block", marginBottom: 8 }}>
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Pagamento de projeto, mercado..."
              className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
              style={{
                borderColor: "var(--border)",
                background: "var(--background)",
                fontSize: "0.85rem",
                color: "var(--navy)",
              }}
            />
          </div>

          {/* Account */}
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--navy)", display: "block", marginBottom: 8 }}>
              Qual conta?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["personal", "business"] as const).map((acc) => (
                <button
                  key={acc}
                  type="button"
                  onClick={() => setAccount(acc)}
                  className="py-2.5 rounded-xl transition-all border-2"
                  style={{
                    borderColor: account === acc ? "var(--navy)" : "var(--border)",
                    background: account === acc ? "var(--navy)" : "transparent",
                    color: account === acc ? "white" : "var(--muted-foreground)",
                    fontWeight: account === acc ? 600 : 400,
                    fontSize: "0.8rem",
                  }}
                >
                  {acc === "personal" ? "Conta pessoal" : "Conta do negócio"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl transition-all hover:opacity-90 active:scale-98 mt-1"
            style={{ background: type === "income" ? "var(--mint)" : "#ef4444", color: "white", fontWeight: 600, fontSize: "0.88rem" }}
          >
            Salvar {type === "income" ? "entrada" : "saída"}
          </button>
        </form>
      </div>
    </div>
  );
}
