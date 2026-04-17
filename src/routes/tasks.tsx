import { createFileRoute } from "@tanstack/react-router";
import { Plus, Check, Circle, Star, BookOpen, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Deen" },
      { name: "description", content: "Organize your Islamic goals, weekly tasks, and spiritual to-dos." },
    ],
  }),
  component: TasksPage,
});

const categories = [
  { name: "Worship", count: 8, icon: Star, color: "from-primary/30 to-warm/20" },
  { name: "Learning", count: 4, icon: BookOpen, color: "from-gold/30 to-warm/20" },
  { name: "Charity", count: 3, icon: Heart, color: "from-sage/30 to-primary/20" },
  { name: "Family", count: 6, icon: Users, color: "from-warm/30 to-gold/20" },
];

const tasks = [
  { title: "Memorize Surah Al-Mulk", category: "Learning", priority: "high", done: false, due: "This week" },
  { title: "Give monthly sadaqah", category: "Charity", priority: "high", done: true, due: "Today" },
  { title: "Call parents after Maghrib", category: "Family", priority: "medium", done: false, due: "Today" },
  { title: "Attend Jumu'ah at masjid", category: "Worship", priority: "high", done: false, due: "Friday" },
  { title: "Read 'Stories of the Prophets'", category: "Learning", priority: "low", done: false, due: "This month" },
  { title: "Visit elderly relative", category: "Family", priority: "medium", done: true, due: "Yesterday" },
  { title: "Prepare Ramadan reading plan", category: "Worship", priority: "low", done: false, due: "Next week" },
];

function TasksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4 animate-slide-up">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Goals</p>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-2">Intentional actions for spiritual growth</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-bold shadow-glow-primary hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </div>

      {/* Categories */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 animate-slide-up stagger-1">
        {categories.map((c) => (
          <button
            key={c.name}
            className={`relative overflow-hidden rounded-2xl glass-card shadow-soft hover:shadow-elevated card-hover p-4 text-left bg-gradient-to-br ${c.color}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm shadow-soft">
              <c.icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <h3 className="font-bold mt-3">{c.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5"><span className="font-bold text-foreground">{c.count}</span> tasks</p>
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="rounded-3xl glass-card shadow-soft p-2 animate-slide-up stagger-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-bold">
            All Tasks <span className="text-xs font-semibold text-muted-foreground">· {tasks.length}</span>
          </div>
          <div className="flex gap-1 text-xs">
            <button className="px-3 py-1.5 rounded-lg bg-primary/12 text-primary font-bold">All</button>
            <button className="px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/50 font-semibold">Active</button>
            <button className="px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/50 font-semibold">Done</button>
          </div>
        </div>
        <div className="space-y-1">
          {tasks.map((t, i) => (
            <div
              key={i}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-muted/40 transition-all ${t.done ? "opacity-50" : ""}`}
            >
              <button className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                t.done ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 hover:border-primary"
              }`}>
                {t.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Circle className="h-3 w-3 opacity-0" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className={`font-semibold ${t.done ? "line-through" : ""}`}>{t.title}</h3>
                  {t.priority === "high" && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-warm bg-warm/15 px-1.5 py-0.5 rounded">High</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.category} · {t.due}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
