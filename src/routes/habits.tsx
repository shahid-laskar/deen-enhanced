import { createFileRoute } from "@tanstack/react-router";
import { Plus, Flame, Check, BookOpen, Heart, Sparkles, Clock, Droplet } from "lucide-react";

export const Route = createFileRoute("/habits")({
  head: () => ({
    meta: [
      { title: "Habits — Deen" },
      { name: "description", content: "Build consistent Islamic habits with streak tracking and daily goals." },
    ],
  }),
  component: HabitsPage,
});

const habits = [
  { name: "Read Quran", target: "10 pages", icon: BookOpen, streak: 23, done: 4, total: 7, color: "primary" },
  { name: "Morning Adhkar", target: "After Fajr", icon: Sparkles, streak: 47, done: 6, total: 7, color: "gold" },
  { name: "Tahajjud", target: "Night prayer", icon: Clock, streak: 8, done: 3, total: 7, color: "sage" },
  { name: "Sadaqah", target: "Daily charity", icon: Heart, streak: 12, done: 5, total: 7, color: "warm" },
  { name: "Drink Water", target: "8 glasses", icon: Droplet, streak: 15, done: 6, total: 7, color: "primary" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

function HabitsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4 animate-slide-up">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Daily Practice</p>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Habits</h1>
          <p className="text-sm text-muted-foreground mt-2">Small consistent acts beloved to Allah</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-bold shadow-glow-primary hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" />
          New Habit
        </button>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3 animate-slide-up stagger-1">
        <div className="relative overflow-hidden rounded-2xl glass-card shadow-soft p-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Today</p>
            </div>
            <p className="text-4xl font-bold mt-3 tabular-nums">4 / 5</p>
            <p className="text-xs text-muted-foreground mt-1">Completed today</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl glass-card shadow-soft p-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/25 text-gold-foreground">
                <Flame className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Best Streak</p>
            </div>
            <p className="text-4xl font-bold mt-3 tabular-nums">47 <span className="text-base font-semibold text-muted-foreground">days</span></p>
            <p className="text-xs text-muted-foreground mt-1">Morning Adhkar</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl glass-card shadow-soft p-5">
          <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/25 text-sage-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">This Month</p>
            </div>
            <p className="text-4xl font-bold mt-3 tabular-nums">87<span className="text-2xl">%</span></p>
            <p className="text-xs text-muted-foreground mt-1">Completion rate</p>
          </div>
        </div>
      </div>

      {/* Habit list */}
      <div className="grid gap-3 animate-slide-up stagger-2">
        {habits.map((h) => {
          const pct = (h.done / h.total) * 100;
          return (
            <div key={h.name} className="group relative overflow-hidden rounded-2xl glass-card shadow-soft hover:shadow-elevated card-hover p-5">
              <div className="flex items-center gap-4">
                <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow-primary transition-all">
                  <h.icon className="h-5 w-5" strokeWidth={2} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-bold">{h.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{h.target}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gold-foreground bg-gold/20 px-2.5 py-1 rounded-full">
                      <Flame className="h-3 w-3" />
                      {h.streak} day streak
                    </div>
                  </div>
                  {/* Week dots */}
                  <div className="flex items-center gap-1.5 mt-3">
                    {weekDays.map((d, i) => {
                      const completed = i < h.done;
                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                              completed
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : "bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            {completed ? <Check className="h-3 w-3" strokeWidth={3} /> : d}
                          </div>
                        </div>
                      );
                    })}
                    <div className="ml-auto text-xs font-bold text-muted-foreground">
                      <span className="text-foreground">{h.done}</span>/{h.total} this week
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
