import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, RotateCcw, Sun, Moon, Heart, Hand } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dhikr")({
  head: () => ({
    meta: [
      { title: "Dhikr & Dua — Deen" },
      { name: "description", content: "Digital tasbeeh counter, morning and evening adhkar, and authentic supplications." },
    ],
  }),
  component: DhikrPage,
});

const adhkarCollections = [
  { name: "Morning", arabic: "أذكار الصباح", count: 24, icon: Sun, gradient: "from-gold/30 to-warm/20" },
  { name: "Evening", arabic: "أذكار المساء", count: 22, icon: Moon, gradient: "from-primary/30 to-sage/20" },
  { name: "After Salah", arabic: "أذكار بعد الصلاة", count: 12, icon: Hand, gradient: "from-sage/30 to-primary/20" },
  { name: "Sleep", arabic: "أذكار النوم", count: 18, icon: Moon, gradient: "from-primary/30 to-warm/20" },
];

const dhikrPhrases = [
  { arabic: "سُبْحَانَ اللَّهِ", translit: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
  { arabic: "الْحَمْدُ لِلَّهِ", translit: "Alhamdulillah", meaning: "All praise to Allah", target: 33 },
  { arabic: "اللَّهُ أَكْبَرُ", translit: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
];

function DhikrPage() {
  const [count, setCount] = useState(47);
  const [activeIdx, setActiveIdx] = useState(0);
  const current = dhikrPhrases[activeIdx];
  const progress = (count / current.target) * 100;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="animate-slide-up">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Remembrance</p>
        <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Dhikr & Dua</h1>
        <p className="text-sm text-muted-foreground mt-2">"Verily, in the remembrance of Allah do hearts find rest" · 13:28</p>
      </div>

      {/* Tasbeeh counter */}
      <div className="relative overflow-hidden rounded-3xl glass-card shadow-elevated p-8 md:p-10 animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-gold/5 to-sage/10" />
        <svg className="absolute -left-20 -bottom-20 h-80 w-80 opacity-[0.06]" viewBox="0 0 200 200">
          <defs>
            <pattern id="dhikr-geo" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dhikr-geo)" className="text-primary" />
        </svg>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="font-amiri text-6xl md:text-7xl font-bold text-foreground leading-tight">{current.arabic}</p>
            <p className="text-lg font-bold mt-4 text-primary">{current.translit}</p>
            <p className="text-sm text-muted-foreground mt-1">{current.meaning}</p>
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
              {dhikrPhrases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setCount(0); }}
                  className={`h-2 rounded-full transition-all ${i === activeIdx ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-5">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="group relative h-52 w-52 rounded-full bg-gradient-to-br from-primary to-warm text-primary-foreground shadow-glow-primary hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 92}`}
                  strokeDashoffset={`${2 * Math.PI * 92 * (1 - Math.min(progress, 100) / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="relative flex flex-col items-center justify-center h-full">
                <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Count</span>
                <span className="text-7xl font-bold tabular-nums mt-1">{count}</span>
                <span className="text-xs opacity-80 mt-1">of {current.target}</span>
              </div>
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setCount(0)}
                className="flex items-center gap-2 rounded-2xl glass-card px-4 py-2 text-sm font-bold shadow-soft hover:shadow-elevated transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-4 py-2 text-sm font-bold shadow-glow-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Today: 247
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adhkar collections */}
      <div className="animate-slide-up stagger-2">
        <h2 className="text-lg font-bold mb-4">Adhkar Collections</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {adhkarCollections.map((c) => (
            <button
              key={c.name}
              className={`group relative overflow-hidden rounded-2xl glass-card shadow-soft hover:shadow-elevated card-hover p-5 text-left bg-gradient-to-br ${c.gradient}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card/80 backdrop-blur-sm shadow-soft">
                <c.icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <h3 className="font-bold mt-4">{c.name}</h3>
              <p className="font-amiri text-base text-primary/80 mt-1">{c.arabic}</p>
              <p className="text-xs text-muted-foreground mt-2 font-semibold">{c.count} adhkar</p>
            </button>
          ))}
        </div>
      </div>

      {/* Dua categories */}
      <div className="rounded-3xl glass-card shadow-soft p-6 md:p-8 animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Dua Library
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Authentic supplications from Quran & Sunnah</p>
          </div>
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {["Travel", "Eating", "Forgiveness", "Protection", "Guidance", "Anxiety", "Health", "Family", "Wealth"].map((cat) => (
            <button
              key={cat}
              className="flex items-center justify-between rounded-xl bg-muted/40 hover:bg-primary/10 hover:text-primary px-4 py-3 text-sm font-bold transition-all group"
            >
              <span>{cat}</span>
              <span className="text-muted-foreground group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
