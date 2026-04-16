import { BookOpen, Sparkles, NotebookPen, Heart, Compass, Users, Dumbbell, Apple } from "lucide-react";

const actions = [
  { title: "Quran", icon: BookOpen, gradient: "from-primary/15 to-primary/5", iconBg: "bg-primary/12 text-primary", desc: "Read & Listen" },
  { title: "Dhikr", icon: Sparkles, gradient: "from-gold/15 to-gold/5", iconBg: "bg-gold/12 text-gold", desc: "Tasbeeh Counter" },
  { title: "Journal", icon: NotebookPen, gradient: "from-sage/15 to-sage/5", iconBg: "bg-sage/12 text-sage", desc: "Daily Reflection" },
  { title: "Habits", icon: Heart, gradient: "from-warm/12 to-warm/5", iconBg: "bg-warm/10 text-warm", desc: "Track Progress" },
  { title: "Qibla", icon: Compass, gradient: "from-primary/12 to-primary/5", iconBg: "bg-primary/10 text-primary", desc: "Find Direction" },
  { title: "Community", icon: Users, gradient: "from-sage/12 to-sage/5", iconBg: "bg-sage/10 text-sage", desc: "Connect" },
  { title: "Wellness", icon: Dumbbell, gradient: "from-warm/12 to-warm/5", iconBg: "bg-warm/10 text-warm", desc: "Body & Mind" },
  { title: "Meals", icon: Apple, gradient: "from-gold/12 to-gold/5", iconBg: "bg-gold/10 text-gold", desc: "Halal Nutrition" },
];

export function QuickActions() {
  return (
    <div className="space-y-4 animate-slide-up stagger-5">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className={`group flex flex-col items-center gap-2.5 rounded-2xl border border-border/50 bg-gradient-to-b ${action.gradient} p-4 md:p-5 transition-all duration-300 hover:shadow-soft hover:border-primary/15 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm`}>
              <action.icon className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{action.title}</p>
              <p className="text-[9px] text-muted-foreground/70 hidden md:block mt-0.5">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
