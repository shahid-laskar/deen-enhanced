import { BookOpen, Sparkles, NotebookPen, Heart, Compass, Users, Dumbbell, Apple } from "lucide-react";

const actions = [
  { title: "Quran", icon: BookOpen, color: "bg-primary/10 text-primary", desc: "Read & Listen" },
  { title: "Dhikr", icon: Sparkles, color: "bg-gold/15 text-gold", desc: "Tasbeeh Counter" },
  { title: "Journal", icon: NotebookPen, color: "bg-sage/15 text-sage", desc: "Daily Reflection" },
  { title: "Habits", icon: Heart, color: "bg-warm/10 text-warm", desc: "Track Progress" },
  { title: "Qibla", icon: Compass, color: "bg-primary/10 text-primary", desc: "Find Direction" },
  { title: "Community", icon: Users, color: "bg-sage/15 text-sage", desc: "Connect" },
  { title: "Wellness", icon: Dumbbell, color: "bg-warm/10 text-warm", desc: "Body & Mind" },
  { title: "Meals", icon: Apple, color: "bg-gold/15 text-gold", desc: "Halal Nutrition" },
];

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{action.title}</p>
              <p className="text-[10px] text-muted-foreground hidden md:block">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
