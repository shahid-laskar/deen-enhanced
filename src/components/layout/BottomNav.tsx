import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Clock, BookOpen, Heart, Sparkles } from "lucide-react";

const tabs = [
  { title: "Home", to: "/", icon: LayoutDashboard },
  { title: "Prayer", to: "/prayer", icon: Clock },
  { title: "Quran", to: "/quran", icon: BookOpen },
  { title: "Dhikr", to: "/dhikr", icon: Sparkles },
  { title: "Habits", to: "/habits", icon: Heart },
] as const;

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`p-1 rounded-lg transition-all ${isActive ? "bg-primary/10" : ""}`}>
                <tab.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">{tab.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
