import { AlertTriangle, Calendar, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    id: 1,
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    title: "Conta de energia vence em 2 dias",
    sub: "R$ 143,50 — Conta pessoal",
    action: "Programar pagamento",
  },
  {
    id: 2,
    icon: Calendar,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    title: "DAS MEI vence dia 20/06",
    sub: "R$ 75,90 — Conta do negócio",
    action: "Separar agora",
  },
  {
    id: 3,
    icon: TrendingUp,
    color: "var(--mint)",
    bg: "var(--mint-dim)",
    title: "Meta de reserva 60% atingida!",
    sub: "R$ 900 de R$ 1.500",
    action: "Ver meta",
  },
];

export function QuickAlerts() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const visible = alerts.filter((a) => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {visible.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: alert.bg, border: `1px solid ${alert.color}22` }}
          >
            <Icon size={16} style={{ color: alert.color, shrink: 0 }} />
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--navy)" }}>{alert.title}</p>
              <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: 1 }}>{alert.sub}</p>
            </div>
            <button
              style={{ fontSize: "0.72rem", color: alert.color, fontWeight: 600, whiteSpace: "nowrap" }}
              className="shrink-0"
            >
              {alert.action}
            </button>
            <button onClick={() => setDismissed([...dismissed, alert.id])} className="shrink-0">
              <X size={13} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
