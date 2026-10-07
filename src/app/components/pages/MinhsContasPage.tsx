import { AccountCard } from "../AccountCard";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";

const transactions = [
  { id: 1, name: "Pedro Alves — Projeto Site", type: "income", amount: 1200, account: "pessoal", date: "09/06", category: "Freelance" },
  { id: 2, name: "Supermercado Extra", type: "expense", amount: 87.4, account: "pessoal", date: "09/06", category: "Alimentação" },
  { id: 3, name: "Carla Menezes — Consultoria", type: "income", amount: 3500, account: "negócio", date: "08/06", category: "Projeto" },
  { id: 4, name: "Assinatura Adobe CC", type: "expense", amount: 54.9, account: "negócio", date: "08/06", category: "Ferramentas" },
  { id: 5, name: "Café entre reuniões", type: "expense", amount: 18.5, account: "pessoal", date: "07/06", category: "Alimentação" },
];

export function MinhasContasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--navy)" }}>Minhas contas</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
          Separação clara entre sua vida pessoal e o seu negócio
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <AccountCard />
        </div>
        <div
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <h3 style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--navy)" }}>Últimas movimentações</h3>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
              style={{ background: "var(--mint-dim)", color: "var(--mint)", fontSize: "0.75rem", fontWeight: 600 }}
            >
              <Plus size={12} />
              Registrar
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-muted transition-colors">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: tx.type === "income" ? "rgba(0,200,150,0.1)" : "rgba(239,68,68,0.08)" }}
                >
                  {tx.type === "income"
                    ? <ArrowDownLeft size={14} style={{ color: "var(--mint)" }} />
                    : <ArrowUpRight size={14} style={{ color: "#ef4444" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--navy)" }}>{tx.name}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>
                    {tx.date} • Conta {tx.account}
                  </p>
                </div>
                <p style={{
                  fontSize: "0.82rem", fontWeight: 600,
                  color: tx.type === "income" ? "var(--mint)" : "#ef4444"
                }}>
                  {tx.type === "income" ? "+" : "-"}R$ {tx.amount.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
