import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Bell, Sunrise, Sun, Sunset, Moon, Star } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Prayer Times — Deen" },
      { name: "description", content: "Daily prayer schedule with adhan times, sunrise, and Qibla direction." },
    ],
  }),
  component: PrayerPage,
});

const prayers = [
  { name: "Fajr", arabic: "الفجر", time: "05:14", icon: Star, period: "Dawn" },
  { name: "Sunrise", arabic: "الشروق", time: "06:42", icon: Sunrise, period: "Morning", isMarker: true },
  { name: "Dhuhr", arabic: "الظهر", time: "12:28", icon: Sun, period: "Noon" },
  { name: "Asr", arabic: "العصر", time: "15:51", icon: Sun, period: "Afternoon" },
  { name: "Maghrib", arabic: "المغرب", time: "18:14", icon: Sunset, period: "Sunset" },
  { name: "Isha", arabic: "العشاء", time: "19:42", icon: Moon, period: "Night" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PrayerPage() {
  const [currentIdx] = useState(2);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Salah Schedule</p>
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Prayer Times</h1>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>Mecca, Saudi Arabia</span>
              <span className="text-muted-foreground/40">•</span>
              <span>{now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-2xl glass-card px-4 py-2.5 text-sm font-semibold shadow-soft hover:shadow-elevated transition-all">
            <Bell className="h-4 w-4 text-primary" />
            Notifications On
          </button>
        </div>
      </div>

      {/* Hero next prayer card */}
      <div className="relative overflow-hidden rounded-3xl glass-card shadow-elevated p-8 md:p-10 animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-gold/5 to-sage/10" />
        <svg className="absolute -right-16 -top-16 h-72 w-72 opacity-[0.07]" viewBox="0 0 200 200">
          <defs>
            <pattern id="prayer-geo" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prayer-geo)" className="text-primary" />
        </svg>
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Next Prayer</p>
            <h2 className="font-amiri text-6xl font-bold mt-2 text-foreground">{prayers[currentIdx + 1].name}</h2>
            <p className="font-amiri text-3xl text-primary mt-1">{prayers[currentIdx + 1].arabic}</p>
            <div className="flex items-center gap-3 mt-6">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold tabular-nums">{prayers[currentIdx + 1].time}</span>
              <span className="text-sm text-muted-foreground">in 3h 23m</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/40" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#ring-grad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * 0.42}`}
                />
                <defs>
                  <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-gold)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Progress</p>
                <p className="text-4xl font-bold tabular-nums mt-1">58%</p>
                <p className="text-xs text-muted-foreground mt-1">of day passed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer list */}
      <div className="grid gap-3 animate-slide-up stagger-2">
        {prayers.map((p, idx) => {
          const isPast = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const isNext = idx === currentIdx + 1;
          return (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 card-hover ${
                isCurrent
                  ? "border-primary/40 bg-primary/8 shadow-glow-primary"
                  : isNext
                  ? "border-gold/30 bg-gold/5 shadow-soft"
                  : "border-border/50 glass-card shadow-soft"
              }`}
            >
              <div className="flex items-center gap-4 p-4 md:p-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-glow-primary"
                      : isNext
                      ? "bg-gold/20 text-gold-foreground"
                      : "bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <p.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <span className="font-amiri text-lg text-primary/70">{p.arabic}</span>
                    {isCurrent && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full animate-pulse-glow">
                        Now
                      </span>
                    )}
                    {isNext && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gold-foreground bg-gold/25 px-2 py-0.5 rounded-full">
                        Next
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.period}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold tabular-nums ${isPast ? "text-muted-foreground" : "text-foreground"}`}>{p.time}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{isPast ? "Completed" : "Upcoming"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly view */}
      <div className="rounded-3xl glass-card shadow-soft p-6 md:p-8 animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold">This Week</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Fajr times — Mon to Sun</p>
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">April</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d, i) => {
            const isToday = i === 2;
            return (
              <div
                key={d}
                className={`flex flex-col items-center gap-2 rounded-2xl py-4 transition-all ${
                  isToday ? "bg-primary text-primary-foreground shadow-glow-primary" : "bg-muted/40 hover:bg-muted/60"
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">{d}</span>
                <span className="text-xl font-bold">{14 + i}</span>
                <span className="text-[10px] tabular-nums opacity-80">05:1{i}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
