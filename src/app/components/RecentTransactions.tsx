import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";

const transactions = [
  { id: 1, name: "Pedro Alves", type: "income", amount: 1200.00, category: "Freelance", time: "há 1h", account: "pessoal" },
  { id: 2, name: "Supermercado Extra", type: "expense", amount: -87.40, category: "Alimentação", time: "hoje 11h", account: "pessoal" },
  { id: 3, name: "Assinatura Adobe", type: "expense", amount: -54.90, category: "Ferramentas", time: "hoje 9h", account: "negócio" },
  { id: 4, name: "Carla Menezes", type: "income", amount: 3500.00, category: "Projeto", time: "ontem", account: "negócio" },
  { id: 5, name: "Uber", type: "expense", amount: -23.70, category: "Transporte", time: "ontem", account: "pessoal" },
];

const categoryColors: Record<string, string> = {
  Freelance: "#3b82f6",
  Alimentação: "#f59e0b",
  Ferramentas: "#8b5cf6",
  Projeto: "var(--mint)",
  Transporte: "#06b6d4",
};

export function RecentTransactions() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 8px rgba(10,22,40,0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--navy)" }}>
          Movimentações recentes
        </h3>
        <button style={{ fontSize: "0.75rem", color: "var(--mint)", fontWeight: 500 }}>
          Ver tudo
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-muted transition-colors cursor-pointer group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: tx.type === "income" ? "rgba(0,200,150,0.1)" : "rgba(239,68,68,0.08)",
              }}
            >
              {tx.type === "income"
                ? <ArrowDownLeft size={16} style={{ color: "var(--mint)" }} />
                : <ArrowUpRight size={16} style={{ color: "#ef4444" }} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--navy)" }}>
                  {tx.name}
                </p>
                <span
                  className="px-1.5 py-0.5 rounded-md shrink-0"
                  style={{ background: `${categoryColors[tx.category]}18`, color: categoryColors[tx.category], fontSize: "0.62rem", fontWeight: 500 }}
                >
                  {tx.category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>{tx.time}</p>
                <span style={{ fontSize: "0.62rem", color: "var(--muted-foreground)", opacity: 0.6 }}>•</span>
                <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>Conta {tx.account}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: tx.type === "income" ? "var(--mint)" : "#ef4444"
              }}>
                {tx.type === "income" ? "+" : ""}R$ {Math.abs(tx.amount).toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              <MoreHorizontal size={14} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
