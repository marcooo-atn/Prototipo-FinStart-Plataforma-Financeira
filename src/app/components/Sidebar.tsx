import {
  Home,
  Wallet,
  ArrowLeftRight,
  BarChart2,
  Target,
  Bot,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { id: "inicio", label: "Início", icon: Home, description: "Panorama do dia" },
  { id: "contas", label: "Minhas contas", icon: Wallet, description: "Pessoal e negócio" },
  { id: "movimentacoes", label: "O que entrou e saiu", icon: ArrowLeftRight, description: "Histórico completo" },
  { id: "negocio", label: "Como vai meu negócio", icon: BarChart2, description: "Desempenho" },
  { id: "planos", label: "Meus planos", icon: Target, description: "Metas e reservas" },
  { id: "copiloto", label: "Copiloto", icon: Bot, description: "IA financeira" },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full w-64 shrink-0"
      style={{ background: "var(--navy)", color: "var(--sidebar-foreground)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--mint)" }}
        >
          <Zap size={18} style={{ color: "var(--navy)" }} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-white leading-none" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
            Fin<span style={{ color: "var(--mint)" }}>Start</span>
          </p>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
            Finanças inteligentes
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group"
              style={{
                background: isActive ? "var(--mint-dim)" : "transparent",
                color: isActive ? "var(--mint)" : "rgba(226,232,240,0.7)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: isActive ? "var(--mint)" : "rgba(255,255,255,0.06)",
                  color: isActive ? "var(--navy)" : "rgba(226,232,240,0.7)",
                }}
              >
                <Icon size={15} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="truncate leading-tight"
                  style={{ fontSize: "0.82rem", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--mint)" : "#e2e8f0" }}
                >
                  {item.label}
                </p>
                <p style={{ fontSize: "0.68rem", color: "rgba(226,232,240,0.4)", marginTop: 1 }}>
                  {item.description}
                </p>
              </div>
              {isActive && (
                <ChevronRight size={13} style={{ color: "var(--mint)", opacity: 0.7 }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="mx-3 mb-4 p-4 rounded-xl" style={{ background: "var(--navy-mid)" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
          Saúde financeira
        </p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: "68%", background: "var(--mint)" }} />
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--mint)", fontWeight: 600 }}>68%</span>
        </div>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>Boa — continue assim!</p>
      </div>
    </aside>
  );
}
