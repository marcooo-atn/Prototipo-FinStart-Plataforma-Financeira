import { useState } from "react";
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw, TrendingUp } from "lucide-react";

export function AccountCard() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [hideBalance, setHideBalance] = useState(false);

  const data = {
    personal: {
      balance: "R$ 3.842,50",
      income: "R$ 5.200,00",
      expense: "R$ 1.357,50",
      pending: "R$ 430,00",
      color: "#3b82f6",
      label: "Conta pessoal",
    },
    business: {
      balance: "R$ 8.315,20",
      income: "R$ 12.400,00",
      expense: "R$ 4.084,80",
      pending: "R$ 1.200,00",
      color: "var(--mint)",
      label: "Conta do negócio",
    },
  };

  const current = data[activeTab];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--navy)", color: "white", boxShadow: "0 8px 32px rgba(10,22,40,0.2)" }}
    >
      {/* Tabs */}
      <div className="flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {(["personal", "business"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-4 transition-all relative"
            style={{
              fontSize: "0.83rem",
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "white" : "rgba(255,255,255,0.45)",
              background: activeTab === tab ? "rgba(255,255,255,0.05)" : "transparent",
            }}
          >
            {data[tab].label}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-16 rounded-full"
                style={{ background: data[tab].color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Balance */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start justify-between mb-1">
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>Saldo disponível</p>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all"
            style={{ background: "rgba(255,255,255,0.07)", fontSize: "0.68rem", color: "rgba(255,255,255,0.5)" }}
          >
            {hideBalance ? <EyeOff size={12} /> : <Eye size={12} />}
            {hideBalance ? "Mostrar" : "Ocultar"}
          </button>
        </div>
        <div className="flex items-end gap-3 mb-5">
          <p style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "white" }}>
            {hideBalance ? "R$ •••••" : current.balance}
          </p>
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full mb-1"
            style={{ background: "rgba(0,200,150,0.15)", color: "var(--mint)", fontSize: "0.72rem", fontWeight: 600 }}
          >
            <TrendingUp size={11} />
            +12% mês
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <ArrowDownLeft size={13} style={{ color: "var(--mint)" }} />
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>Entradas</p>
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--mint)" }}>
              {hideBalance ? "•••" : current.income}
            </p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <ArrowUpRight size={13} style={{ color: "#f87171" }} />
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>Saídas</p>
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f87171" }}>
              {hideBalance ? "•••" : current.expense}
            </p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <RefreshCw size={13} style={{ color: "#fbbf24" }} />
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>A receber</p>
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fbbf24" }}>
              {hideBalance ? "•••" : current.pending}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex gap-2">
        {["Transferir", "Pagar", "Receber", "Extrato"].map((action) => (
          <button
            key={action}
            className="flex-1 py-2 rounded-xl transition-all hover:opacity-80 active:scale-95"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 500 }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
