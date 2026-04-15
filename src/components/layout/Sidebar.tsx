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
      className="absolute inset-0 h-full w-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="sidebar-geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.3" />
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
      className={`hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border relative transition-all duration-300 ${collapsed ? "w-[4.5rem]" : "w-64"}`}
    >
      <GeometricPattern />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="font-amiri text-lg font-bold">د</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-semibold tracking-tight text-sidebar-foreground">Deen</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Your Islamic Companion</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-primary" : ""}`} />
              {!collapsed && <span>{item.title}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative z-10 border-t border-sidebar-border px-3 py-3 space-y-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
        >
          {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-[18px] w-[18px]" /> : <ChevronLeft className="h-[18px] w-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
