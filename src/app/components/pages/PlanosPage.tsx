import { Target, Shield, Plus, TrendingUp } from "lucide-react";

const goals = [
  { id: 1, name: "Reserva de emergência", target: 1500, current: 900, icon: Shield, color: "var(--mint)", deadline: "Ago 2026" },
  { id: 2, name: "Notebook novo para trabalho", target: 4500, current: 1200, icon: Target, color: "#3b82f6", deadline: "Dez 2026" },
  { id: 3, name: "Fundo de férias", target: 2000, current: 450, icon: TrendingUp, color: "#f59e0b", deadline: "Jan 2027" },
];

export function PlanosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--navy)" }}>Meus planos</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
            Metas, reservas e planejamento do futuro
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: "var(--mint)", color: "var(--navy)", fontWeight: 600, fontSize: "0.8rem" }}
        >
          <Plus size={14} />
          Nova meta
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <div
              key={goal.id}
              className="rounded-2xl p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${goal.color}18` }}
                >
                  <Icon size={18} style={{ color: goal.color }} />
                </div>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ background: "var(--secondary)", color: "var(--muted-foreground)", fontSize: "0.68rem" }}
                >
                  Meta até {goal.deadline}
                </span>
              </div>
              <p style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--navy)", marginBottom: 4 }}>{goal.name}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <p style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)" }}>
                  R$ {goal.current.toLocaleString("pt-BR")}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  de R$ {goal.target.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="mb-2">
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: goal.color }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>
                  Falta R$ {(goal.target - goal.current).toLocaleString("pt-BR")}
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: goal.color }}>{pct}%</span>
              </div>
              <button
                className="w-full mt-4 py-2 rounded-xl transition-all hover:opacity-80"
                style={{ background: `${goal.color}18`, color: goal.color, fontSize: "0.78rem", fontWeight: 600 }}
              >
                Adicionar valor
              </button>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--navy)", color: "white" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Shield size={18} style={{ color: "var(--mint)" }} />
          <p style={{ fontWeight: 600, fontSize: "0.88rem" }}>Dica do Copiloto</p>
        </div>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          Sua reserva de emergência já está em <strong style={{ color: "var(--mint)" }}>60%</strong> da meta!
          Para chegar lá até agosto, você precisa guardar apenas <strong style={{ color: "var(--mint)" }}>R$ 150/mês</strong>.
          Quer que eu crie um lembrete automático?
        </p>
      </div>
    </div>
  );
}
