import { Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function MobileHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="font-amiri text-base font-bold">د</span>
        </div>
        <span className="text-base font-semibold tracking-tight">Deen</span>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </header>
  );
}
