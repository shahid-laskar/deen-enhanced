import { Check, Circle, Flame } from "lucide-react";

const habits = [
  { name: "Fajr on time", done: true },
  { name: "Read 1 page Quran", done: true },
  { name: "Morning Adhkar", done: false },
  { name: "Give Sadaqah", done: false },
  { name: "Pray Tahajjud", done: false },
];

export function HabitsSummary() {
  const completed = habits.filter((h) => h.done).length;
  const percentage = Math.round((completed / habits.length) * 100);

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft card-hover space-y-5 animate-slide-up stagger-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Today's Habits</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gold">
            <Flame className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold">3 day streak</span>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{completed}/{habits.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-gold to-primary transition-all duration-700 ease-out"
            style={{
              width: `${percentage}%`,
              boxShadow: percentage > 0 ? "0 0 12px color-mix(in oklab, var(--color-primary) 30%, transparent)" : "none",
            }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground font-medium">{percentage}% completed</p>
      </div>

      {/* Habit list */}
      <div className="space-y-1.5">
        {habits.map((habit) => (
          <div
            key={habit.name}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
              habit.done ? "bg-sage/8" : "bg-transparent hover:bg-muted/40"
            }`}
          >
            {habit.done ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-sage-foreground shadow-sm">
                <Check className="h-3 w-3" strokeWidth={3} />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center">
                <Circle className="h-5 w-5 text-border" strokeWidth={1.5} />
              </div>
            )}
            <span className={`text-sm ${habit.done ? "text-muted-foreground line-through decoration-muted-foreground/30" : "text-foreground font-medium"}`}>
              {habit.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
