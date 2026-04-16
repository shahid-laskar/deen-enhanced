import { Moon, Sun, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export function MobileHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border/40 glass-card md:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
          <span className="font-amiri text-base font-bold">د</span>
        </div>
        <div>
          <span className="text-base font-bold tracking-tight">Deen</span>
          <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground font-semibold -mt-0.5">Islamic Companion</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-xl text-muted-foreground/60 hover:bg-accent/60 transition-all">
          <Bell className="h-4.5 w-4.5" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-muted-foreground/60 hover:bg-accent/60 transition-all"
        >
          <div className="transition-transform duration-300">
            {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </div>
        </button>
      </div>
    </header>
  );
}
