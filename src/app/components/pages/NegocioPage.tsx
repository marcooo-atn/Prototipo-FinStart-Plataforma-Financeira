import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const monthlyData = [
  { mes: "Jan", entradas: 8200, saidas: 3100 },
  { mes: "Fev", entradas: 9500, saidas: 3800 },
  { mes: "Mar", entradas: 7800, saidas: 2900 },
  { mes: "Abr", entradas: 11200, saidas: 4200 },
  { mes: "Mai", entradas: 10800, saidas: 3600 },
  { mes: "Jun", entradas: 12400, saidas: 4084 },
];

const categoryData = [
  { categoria: "Freelance", valor: 7200 },
  { categoria: "Projetos", valor: 4800 },
  { categoria: "Consultoria", valor: 400 },
];

const metrics = [
  { label: "Receita total (junho)", value: "R$ 12.400,00", delta: "+14,8%", positive: true },
  { label: "Custos do negócio", value: "R$ 4.084,80", delta: "+13,5%", positive: false },
  { label: "Resultado líquido", value: "R$ 8.315,20", delta: "+15,6%", positive: true },
  { label: "Margem de lucro", value: "67%", delta: "+0,7pp", positive: true },
];

export function NegocioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--navy)" }}>Como vai meu negócio</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
          Desempenho financeiro simplificado — junho 2026
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginBottom: 8 }}>{m.label}</p>
            <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)" }}>{m.value}</p>
            <div className="flex items-center gap-1 mt-1.5">
              {m.positive
                ? <TrendingUp size={12} style={{ color: "var(--mint)" }} />
                : <TrendingDown size={12} style={{ color: "#ef4444" }} />
              }
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: m.positive ? "var(--mint)" : "#ef4444" }}>
                {m.delta}
              </span>
              <span style={{ fontSize: "0.68rem", color: "var(--muted-foreground)" }}>vs. mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)", marginBottom: 16 }}>
            Entradas vs. saídas (últimos 6 meses)
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c896" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00c896" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Area type="monotone" dataKey="entradas" stroke="#00c896" strokeWidth={2} fill="url(#gradIn)" name="Entradas" />
              <Area type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={2} fill="url(#gradOut)" name="Saídas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)", marginBottom: 16 }}>
            Origem das receitas
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Bar dataKey="valor" fill="#00c896" radius={[0, 8, 8, 0]} name="Receita" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
