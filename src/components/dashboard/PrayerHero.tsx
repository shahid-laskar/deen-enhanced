import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

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

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PrayerHero() {
  const [next, setNext] = useState(getNextPrayer);
  const [countdown, setCountdown] = useState("");
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

      // Progress: fraction of time elapsed since previous prayer
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

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-gold/5 border border-border p-6">
      {/* Geometric background */}
      <svg className="absolute top-0 right-0 w-48 h-48 text-primary/[0.04]" viewBox="0 0 200 200">
        <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <polygon points="100,50 150,80 150,120 100,150 50,120 50,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Progress ring */}
        <div className="relative flex-shrink-0">
          <svg width="140" height="140" className="-rotate-90">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-amiri text-xl text-primary">{next.arabicName}</span>
            <span className="text-[11px] font-medium text-muted-foreground mt-0.5">{next.time}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Next Prayer</span>
          </div>
          <h3 className="text-3xl font-bold text-foreground">{next.name}</h3>
          <p className="text-2xl font-mono font-semibold text-primary tabular-nums">
            {countdown}
          </p>
        </div>

        {/* Prayer dots */}
        <div className="flex md:flex-col gap-3">
          {PRAYERS.map((p, i) => {
            const isPast = i < next.index;
            const isCurrent = i === next.index;
            return (
              <div key={p.name} className="flex flex-col items-center gap-1">
                <div
                  className={`h-3 w-3 rounded-full border-2 transition-all ${
                    isCurrent
                      ? "border-primary bg-primary scale-110"
                      : isPast
                        ? "border-sage bg-sage"
                        : "border-border bg-transparent"
                  }`}
                />
                <span className="text-[9px] font-medium text-muted-foreground">{p.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
