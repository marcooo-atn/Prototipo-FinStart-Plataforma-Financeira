import { AlertCircle, Thermometer } from "lucide-react";

export function SpendingLimit() {
  const limit = 45.00;
  const spent = 27.50;
  const percentage = (spent / (limit + spent)) * 100;
  const remaining = limit;

  const getColor = () => {
    if (percentage < 50) return "var(--mint)";
    if (percentage < 75) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 8px rgba(10,22,40,0.06)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", marginBottom: 2 }}>
            Seu limite seguro de gasto
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>para hoje é:</p>
        </div>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "var(--mint-dim)" }}
        >
          <Thermometer size={16} style={{ color: "var(--mint)" }} />
        </div>
      </div>

      {/* Big number */}
      <div className="flex items-baseline gap-2 mb-4">
        <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.02em" }}>
          R$ {remaining.toFixed(2).replace(".", ",")}
        </p>
        <span
          className="px-2 py-0.5 rounded-full"
          style={{ background: "var(--mint-dim)", color: "var(--mint)", fontSize: "0.68rem", fontWeight: 600 }}
        >
          seguro
        </span>
      </div>

      {/* Thermometer bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1.5">
          <span style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>Gasto hoje</span>
          <span style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>
            R$ {spent.toFixed(2).replace(".", ",")} de R$ {(spent + limit).toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${percentage}%`, background: getColor() }}
          />
        </div>
        {/* Scale markers */}
        <div className="flex justify-between mt-1">
          <span style={{ fontSize: "0.62rem", color: "var(--muted-foreground)" }}>R$ 0</span>
          <span style={{ fontSize: "0.62rem", color: "var(--muted-foreground)" }}>
            R$ {(spent + limit).toFixed(0)}
          </span>
        </div>
      </div>

      {/* Alert */}
      <div
        className="flex items-start gap-2 p-2.5 rounded-xl"
        style={{ background: "rgba(0,200,150,0.08)" }}
      >
        <AlertCircle size={13} style={{ color: "var(--mint)", marginTop: 1, shrink: 0 }} />
        <p style={{ fontSize: "0.7rem", color: "var(--navy)", lineHeight: 1.5 }}>
          Você gastou <strong>R$ 27,50</strong> hoje. Ainda tem R$ 45,00 de margem segura.
        </p>
      </div>
    </div>
  );
}
