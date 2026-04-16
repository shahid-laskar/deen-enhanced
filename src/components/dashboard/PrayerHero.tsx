import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";

const PRAYERS = [
  { name: "Fajr", time: "05:15", arabicName: "الفجر" },
  { name: "Dhuhr", time: "12:30", arabicName: "الظهر" },
  { name: "Asr", time: "15:45", arabicName: "العصر" },
  { name: "Maghrib", time: "18:30", arabicName: "المغرب" },
  { name: "Isha", time: "20:00", arabicName: "العشاء" },
];

function parseTime(t: string): Date {
  const [h, m] = t.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function getNextPrayer() {
  const now = new Date();
  for (let i = 0; i < PRAYERS.length; i++) {
    if (parseTime(PRAYERS[i].time) > now) {
      return { ...PRAYERS[i], index: i };
    }
  }
  return { ...PRAYERS[0], index: 0 };
}

function formatCountdown(ms: number): { h: string; m: string; s: string } {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function PrayerHero() {
  const [next, setNext] = useState(getNextPrayer);
  const [countdown, setCountdown] = useState({ h: "00", m: "00", s: "00" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const np = getNextPrayer();
      setNext(np);
      const now = new Date();
      const target = parseTime(np.time);
      if (target < now) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      setCountdown(formatCountdown(diff));

      const prevIdx = np.index === 0 ? 4 : np.index - 1;
      const prevTime = parseTime(PRAYERS[prevIdx].time);
      if (prevTime > now) prevTime.setDate(prevTime.getDate() - 1);
      const total = target.getTime() - prevTime.getTime();
      const elapsed = now.getTime() - prevTime.getTime();
      setProgress(Math.min((elapsed / total) * 100, 100));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/12 via-card to-gold/8 border border-border/60 p-7 shadow-soft animate-slide-up stagger-2">
      {/* Decorative geometric bg */}
      <svg className="absolute -top-4 -right-4 w-64 h-64 text-primary/[0.03]" viewBox="0 0 200 200">
        <polygon points="100,5 195,55 195,145 100,195 5,145 5,55" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="100,25 175,65 175,135 100,175 25,135 25,65" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <polygon points="100,45 155,75 155,125 100,155 45,125 45,75" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Progress ring */}
        <div className="relative flex-shrink-0">
          {/* Glow behind ring */}
          <div className="absolute inset-2 rounded-full bg-primary/8 blur-xl animate-pulse-glow" />
          <svg width="148" height="148" className="-rotate-90 relative z-10">
            <circle cx="74" cy="74" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-border/40" />
            <circle
              cx="74" cy="74" r={radius}
              fill="none"
              stroke="url(#prayer-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-1000 ease-linear"
              style={{ filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--color-primary) 30%, transparent))" }}
            />
            <defs>
              <linearGradient id="prayer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="font-amiri text-2xl text-primary leading-none">{next.arabicName}</span>
            <span className="text-[11px] font-semibold text-muted-foreground mt-1 tracking-wide">{next.time}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Next Prayer</span>
          </div>
          <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{next.name}</h3>
          
          {/* Countdown digits */}
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            {[
              { value: countdown.h, label: "hr" },
              { value: countdown.m, label: "min" },
              { value: countdown.s, label: "sec" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-1.5">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-mono font-bold tabular-nums text-primary leading-none">
                    {unit.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{unit.label}</span>
                </div>
                {i < 2 && <span className="text-2xl font-light text-muted-foreground/40 -mt-3">:</span>}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground/60">
            <MapPin className="h-3 w-3" />
            <span className="text-[10px] tracking-wide">Location not set</span>
          </div>
        </div>

        {/* Prayer timeline */}
        <div className="flex md:flex-col gap-2.5">
          {PRAYERS.map((p, i) => {
            const isPast = i < next.index;
            const isCurrent = i === next.index;
            return (
              <div key={p.name} className="flex flex-col items-center gap-1.5 group">
                <div
                  className={`relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                    isCurrent
                      ? "border-primary bg-primary shadow-glow-primary scale-110"
                      : isPast
                        ? "border-sage/60 bg-sage/80"
                        : "border-border bg-background"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  )}
                </div>
                <div className="text-center">
                  <span className={`text-[9px] font-semibold tracking-wide ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                    {p.name}
                  </span>
                  <span className="text-[8px] text-muted-foreground/50 block">{p.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
