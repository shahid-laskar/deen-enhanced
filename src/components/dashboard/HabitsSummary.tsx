import { Check, Circle } from "lucide-react";

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
    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Today's Habits</h3>
        <span className="text-xs font-bold text-primary">{completed}/{habits.length}</span>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground">{percentage}% completed</p>
      </div>

      {/* Habit list */}
      <div className="space-y-2">
        {habits.map((habit) => (
          <div
            key={habit.name}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
              habit.done ? "bg-sage/10" : "bg-transparent hover:bg-muted/50"
            }`}
          >
            {habit.done ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-sage-foreground">
                <Check className="h-3 w-3" />
              </div>
            ) : (
              <Circle className="h-5 w-5 text-border" />
            )}
            <span className={`text-sm ${habit.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {habit.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
