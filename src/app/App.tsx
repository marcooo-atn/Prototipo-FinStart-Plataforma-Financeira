import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AccountCard } from "./components/AccountCard";
import { SpendingLimit } from "./components/SpendingLimit";
import { RecentTransactions } from "./components/RecentTransactions";
import { QuickAlerts } from "./components/QuickAlerts";
import { QuickEntryModal } from "./components/QuickEntryModal";
import { CopilotChat } from "./components/CopilotChat";
import { MinhasContasPage } from "./components/pages/MinhsContasPage";
import { MovimentacoesPage } from "./components/pages/MovimentacoesPage";
import { NegocioPage } from "./components/pages/NegocioPage";
import { PlanosPage } from "./components/pages/PlanosPage";
import { CopilotoPage } from "./components/pages/CopilotoPage";
import { Bot } from "lucide-react";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [page, setPage] = useState("inicio");
  const [showEntry, setShowEntry] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  return (
    <div className="size-full flex overflow-hidden" style={{ background: "var(--background)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar active={page} onNavigate={setPage} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onQuickEntry={() => setShowEntry(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          {page === "inicio" && <InicioPage onQuickEntry={() => setShowEntry(true)} />}
          {page === "contas" && <MinhasContasPage />}
          {page === "movimentacoes" && <MovimentacoesPage />}
          {page === "negocio" && <NegocioPage />}
          {page === "planos" && <PlanosPage />}
          {page === "copiloto" && <CopilotoPage />}
        </main>
      </div>

      {/* Quick Entry Modal */}
      {showEntry && <QuickEntryModal onClose={() => setShowEntry(false)} />}

      {/* Copilot Chat bubble */}
      {showCopilot && <CopilotChat onClose={() => setShowCopilot(false)} />}

      {/* Floating copilot button */}
      <button
        onClick={() => setShowCopilot(!showCopilot)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 z-40"
        style={{ background: showCopilot ? "var(--navy)" : "var(--mint)", boxShadow: "0 8px 24px rgba(0,200,150,0.35)" }}
        title="Copiloto IA"
      >
        <Bot size={24} style={{ color: showCopilot ? "var(--mint)" : "var(--navy)" }} strokeWidth={2} />
      </button>
    </div>
  );
}

/* ── Início Page (inline, dashboard) ─────────────────────────────────────── */
function InicioPage({ onQuickEntry }: { onQuickEntry: () => void }) {
  return (
    <div className="flex flex-col gap-5 max-w-5xl">
      {/* Alerts strip */}
      <QuickAlerts />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left column — account card + spending */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <AccountCard />
          <SpendingLimit />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Day summary */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 8px rgba(10,22,40,0.06)" }}
          >
            <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)", marginBottom: 12 }}>
              Resumo de hoje
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Lançamentos hoje", value: "3", icon: "📋" },
                { label: "Contas a pagar hoje", value: "0", icon: "📅" },
                { label: "A receber esta semana", value: "R$ 430,00", icon: "💰" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{item.label}</p>
                  </div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 8px rgba(10,22,40,0.06)" }}
          >
            <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)", marginBottom: 12 }}>
              Ações rápidas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Registrar entrada ou saída", action: onQuickEntry, primary: true },
                { label: "Ver extrato completo", action: undefined, primary: false },
                { label: "Pagar conta", action: undefined, primary: false },
                { label: "Falar com Copiloto", action: undefined, primary: false },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  className="p-3 rounded-xl transition-all hover:opacity-80 active:scale-95 text-left"
                  style={{
                    background: btn.primary ? "var(--mint)" : "var(--background)",
                    color: btn.primary ? "var(--navy)" : "var(--muted-foreground)",
                    fontSize: "0.72rem",
                    fontWeight: btn.primary ? 600 : 400,
                    border: btn.primary ? "none" : "1px solid var(--border)",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <RecentTransactions />
    </div>
  );
}
