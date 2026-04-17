import { createFileRoute } from "@tanstack/react-router";
import { Plus, NotebookPen, Calendar, Smile } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Deen" },
      { name: "description", content: "Daily Islamic reflection journal — gratitude, lessons, and spiritual growth." },
    ],
  }),
  component: JournalPage,
});

const entries = [
  {
    date: "Today",
    weekday: "Wednesday",
    mood: "Grateful",
    title: "Reflections after Fajr",
    excerpt: "Today I woke for Fajr feeling renewed. The stillness before dawn reminded me of how Allah's mercy precedes everything. I made dua for my family and reflected on the gift of another day...",
    tags: ["Fajr", "Gratitude"],
  },
  {
    date: "Yesterday",
    weekday: "Tuesday",
    mood: "Peaceful",
    title: "Lessons from Surah Al-Kahf",
    excerpt: "Reading the story of the People of the Cave reminded me that true companionship is built on faith. I want to be more intentional with the company I keep...",
    tags: ["Quran", "Reflection"],
  },
  {
    date: "Apr 14",
    weekday: "Monday",
    mood: "Hopeful",
    title: "A challenging day at work",
    excerpt: "Faced a difficult conversation at work today. Recited 'HasbunAllahu wa ni'mal wakeel' and felt my heart settle. Allah is the best disposer of affairs...",
    tags: ["Patience", "Work"],
  },
];

function JournalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4 animate-slide-up">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Reflection</p>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Journal</h1>
          <p className="text-sm text-muted-foreground mt-2">Capture your spiritual journey, one day at a time</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-bold shadow-glow-primary hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" />
          New Entry
        </button>
      </div>

      {/* Composer */}
      <div className="relative overflow-hidden rounded-3xl glass-card shadow-elevated p-6 md:p-8 animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-primary/10" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-bold">
            <NotebookPen className="h-3.5 w-3.5 text-primary" />
            Today's Reflection
          </div>
          <p className="font-amiri text-2xl md:text-3xl mt-3 text-foreground/90 italic">
            "What did Allah reveal to you today?"
          </p>
          <textarea
            placeholder="Write freely... your thoughts, gratitude, lessons learned..."
            rows={4}
            className="w-full mt-5 bg-transparent text-base placeholder:text-muted-foreground/60 focus:outline-none resize-none border-l-2 border-primary/30 pl-4"
          />
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Smile className="h-4 w-4" />
              <span className="font-semibold">How are you feeling?</span>
              <div className="flex gap-1.5 ml-2">
                {["😊", "🤲", "💭", "😌", "🌙"].map((e) => (
                  <button key={e} className="h-7 w-7 rounded-lg hover:bg-muted/60 transition-all flex items-center justify-center">
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <button className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-bold shadow-soft hover:shadow-glow-primary transition-all">
              Save Entry
            </button>
          </div>
        </div>
      </div>

      {/* Entries timeline */}
      <div className="space-y-4 animate-slide-up stagger-2">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Calendar className="h-4 w-4 text-primary" />
          Recent Entries
          <span className="text-xs font-semibold text-muted-foreground ml-1">· 47 total</span>
        </div>
        {entries.map((e, idx) => (
          <article
            key={idx}
            className="group relative rounded-2xl glass-card shadow-soft hover:shadow-elevated card-hover p-6"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="flex items-baseline gap-3">
                <h3 className="text-lg font-bold">{e.title}</h3>
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/12 px-2 py-0.5 rounded-full">
                  {e.mood}
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-semibold">
                <span className="text-foreground font-bold">{e.date}</span>
                <span className="text-muted-foreground/40 mx-2">·</span>
                {e.weekday}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{e.excerpt}</p>
            <div className="flex items-center gap-2 mt-4">
              {e.tags.map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
