import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Clock,
  BookOpen,
  Heart,
  NotebookPen,
  ListTodo,
  Compass,
  Settings,
  Moon,
  Sun,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Prayer Times", to: "/prayer", icon: Clock },
  { title: "Quran", to: "/quran", icon: BookOpen },
  { title: "Dhikr & Dua", to: "/dhikr", icon: Sparkles },
  { title: "Habits", to: "/habits", icon: Heart },
  { title: "Journal", to: "/journal", icon: NotebookPen },
  { title: "Tasks", to: "/tasks", icon: ListTodo },
  { title: "Qibla", to: "/qibla", icon: Compass },
  { title: "Settings", to: "/settings", icon: Settings },
] as const;

function GeometricPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="sidebar-geo" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M24 0L48 24L24 48L0 24Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sidebar-geo)" />
    </svg>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border/60 relative transition-all duration-300 ease-out ${collapsed ? "w-[4.5rem]" : "w-64"}`}
    >
      <GeometricPattern />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 px-5 py-6 border-b border-sidebar-border/40">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
          <span className="font-amiri text-lg font-bold">د</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">Deen</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Your Islamic Companion</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
              )}
              <item.icon className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-primary" : ""}`} strokeWidth={isActive ? 2.2 : 1.8} />
              {!collapsed && <span className="truncate">{item.title}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-glow-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative z-10 border-t border-sidebar-border/40 px-3 py-3 space-y-1">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all duration-200"
        >
          <div className="relative">
            {darkMode ? <Sun className="h-[18px] w-[18px] transition-transform duration-300 rotate-0" /> : <Moon className="h-[18px] w-[18px] transition-transform duration-300" />}
          </div>
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="h-[18px] w-[18px]" /> : <ChevronLeft className="h-[18px] w-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
