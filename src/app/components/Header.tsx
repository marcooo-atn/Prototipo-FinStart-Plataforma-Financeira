import { Bell, Search, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

const notifications = [
  { id: 1, text: "Conta de energia vence em 2 dias", type: "alert", time: "agora" },
  { id: 2, text: "Recebeu R$ 1.200,00 de Pedro Alves", type: "income", time: "há 1h" },
  { id: 3, text: "Você atingiu 80% do limite de gasto diário", type: "warning", time: "há 3h" },
];

interface HeaderProps {
  onQuickEntry: () => void;
}

export function Header({ onQuickEntry }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b shrink-0"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Greeting */}
      <div>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
          Terça-feira, 9 de junho de 2026
        </p>
        <h1 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)" }}>Olá, José! 👋</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "var(--background)", border: "1px solid var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--muted-foreground)" }} />
          <input
            placeholder="Buscar..."
            className="outline-none bg-transparent"
            style={{ width: 140, fontSize: "0.8rem", color: "var(--foreground)" }}
          />
        </div>

        {/* Quick entry button */}
        <button
          onClick={onQuickEntry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--mint)", color: "var(--navy)", fontWeight: 600, fontSize: "0.8rem" }}
        >
          <Plus size={14} strokeWidth={2.5} />
          Registrar entrada ou saída
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "var(--background)", border: "1px solid var(--border)" }}
          >
            <Bell size={16} style={{ color: "var(--foreground)" }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "var(--destructive)" }}
            />
          </button>
          {showNotifications && (
            <div
              className="absolute right-0 top-11 w-72 rounded-2xl shadow-xl z-50 overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>Notificações</p>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: n.type === "income" ? "var(--mint)" : n.type === "warning" ? "#f59e0b" : "var(--destructive)" }}
                  />
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--foreground)" }}>{n.text}</p>
                    <p style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", marginTop: 2 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 transition-all"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: "var(--navy-light)", fontWeight: 700, fontSize: "0.85rem" }}
            >
              L
            </div>
            <ChevronDown size={13} style={{ color: "var(--muted-foreground)" }} />
          </button>
          {showProfile && (
            <div
              className="absolute right-0 top-11 w-44 rounded-2xl shadow-xl z-50 overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {["Meu perfil", "Configurações", "Sair"].map((item) => (
                <button key={item} className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors" style={{ fontSize: "0.82rem" }}>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
