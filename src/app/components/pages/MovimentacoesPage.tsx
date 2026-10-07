import { ArrowDownLeft, ArrowUpRight, Search, Filter } from "lucide-react";
import { useState } from "react";

const all = [
  { id: 1, name: "Pedro Alves — Projeto Site", type: "income", amount: 1200, account: "pessoal", date: "09/06/2026", category: "Freelance" },
  { id: 2, name: "Supermercado Extra", type: "expense", amount: 87.4, account: "pessoal", date: "09/06/2026", category: "Alimentação" },
  { id: 3, name: "Café entre reuniões", type: "expense", amount: 18.5, account: "pessoal", date: "09/06/2026", category: "Alimentação" },
  { id: 4, name: "Carla Menezes — Consultoria", type: "income", amount: 3500, account: "negócio", date: "08/06/2026", category: "Projeto" },
  { id: 5, name: "Assinatura Adobe CC", type: "expense", amount: 54.9, account: "negócio", date: "08/06/2026", category: "Ferramentas" },
  { id: 6, name: "Uber para reunião", type: "expense", amount: 23.7, account: "pessoal", date: "07/06/2026", category: "Transporte" },
  { id: 7, name: "Raphael Costa — Logo", type: "income", amount: 800, account: "negócio", date: "06/06/2026", category: "Freelance" },
  { id: 8, name: "Internet (Vivo Fibra)", type: "expense", amount: 99.9, account: "negócio", date: "05/06/2026", category: "Ferramentas" },
  { id: 9, name: "Farmácia São João", type: "expense", amount: 34.2, account: "pessoal", date: "04/06/2026", category: "Saúde" },
  { id: 10, name: "DAS MEI — Maio", type: "expense", amount: 75.9, account: "negócio", date: "20/05/2026", category: "Impostos" },
];

const categoryColors: Record<string, string> = {
  Freelance: "#3b82f6",
  Alimentação: "#f59e0b",
  Ferramentas: "#8b5cf6",
  Projeto: "#00c896",
  Transporte: "#06b6d4",
  Saúde: "#f43f5e",
  Impostos: "#f97316",
};

export function MovimentacoesPage() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [search, setSearch] = useState("");

  const filtered = all.filter((t) => {
    if (filter === "income" && t.type !== "income") return false;
    if (filter === "expense" && t.type !== "expense") return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIn = all.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalOut = all.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--navy)" }}>O que entrou e saiu</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
          Histórico completo de todas as movimentações
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total de entradas", value: `R$ ${totalIn.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, color: "var(--mint)", bg: "var(--mint-dim)" },
          { label: "Total de saídas", value: `R$ ${totalOut.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
          { label: "Saldo do período", value: `R$ ${(totalIn - totalOut).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, color: "var(--navy)", bg: "var(--secondary)" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: s.bg }}>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl"
            style={{ background: "var(--background)", border: "1px solid var(--border)" }}
          >
            <Search size={14} style={{ color: "var(--muted-foreground)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar movimentação..."
              className="outline-none bg-transparent flex-1"
              style={{ fontSize: "0.82rem" }}
            />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--background)" }}>
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: filter === f ? "var(--card)" : "transparent",
                  color: filter === f ? "var(--navy)" : "var(--muted-foreground)",
                  fontSize: "0.78rem",
                  fontWeight: filter === f ? 600 : 400,
                  boxShadow: filter === f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {f === "all" ? "Todos" : f === "income" ? "Entradas" : "Saídas"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {filtered.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-muted transition-colors">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: tx.type === "income" ? "rgba(0,200,150,0.1)" : "rgba(239,68,68,0.08)" }}
              >
                {tx.type === "income"
                  ? <ArrowDownLeft size={16} style={{ color: "var(--mint)" }} />
                  : <ArrowUpRight size={16} style={{ color: "#ef4444" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate" style={{ fontSize: "0.83rem", fontWeight: 500, color: "var(--navy)" }}>{tx.name}</p>
                  <span
                    className="px-1.5 py-0.5 rounded-md shrink-0"
                    style={{ background: `${categoryColors[tx.category] ?? "#999"}18`, color: categoryColors[tx.category] ?? "#999", fontSize: "0.62rem" }}
                  >
                    {tx.category}
                  </span>
                </div>
                <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: 1 }}>
                  {tx.date} • Conta {tx.account}
                </p>
              </div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: tx.type === "income" ? "var(--mint)" : "#ef4444" }}>
                {tx.type === "income" ? "+" : "-"}R$ {tx.amount.toFixed(2).replace(".", ",")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
