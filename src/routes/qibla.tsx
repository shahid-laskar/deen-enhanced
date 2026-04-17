import { createFileRoute } from "@tanstack/react-router";
import { Compass, MapPin, Navigation } from "lucide-react";

export const Route = createFileRoute("/qibla")({
  head: () => ({
    meta: [
      { title: "Qibla — Deen" },
      { name: "description", content: "Find the direction of the Kaaba in Makkah from your current location." },
    ],
  }),
  component: QiblaPage,
});

function QiblaPage() {
  const direction = 118;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="text-center animate-slide-up">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Sacred Direction</p>
        <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Qibla</h1>
        <p className="text-sm text-muted-foreground mt-2">Direction of the Kaaba in Makkah al-Mukarramah</p>
      </div>

      {/* Compass */}
      <div className="relative overflow-hidden rounded-3xl glass-card shadow-elevated p-8 md:p-12 animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" viewBox="0 0 400 400">
          <defs>
            <pattern id="qibla-geo" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25 0L50 25L25 50L0 25Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <circle cx="25" cy="25" r="6" fill="none" stroke="currentColor" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#qibla-geo)" className="text-primary" />
        </svg>

        <div className="relative flex flex-col items-center">
          <div className="relative h-72 w-72 md:h-96 md:w-96">
            {/* Outer ring */}
            <svg viewBox="0 0 400 400" className="absolute inset-0">
              <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
              <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/60" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/40" />

              {/* Cardinal markers */}
              {[
                { label: "N", angle: 0 },
                { label: "E", angle: 90 },
                { label: "S", angle: 180 },
                { label: "W", angle: 270 },
              ].map((c) => {
                const rad = (c.angle - 90) * (Math.PI / 180);
                const x = 200 + 170 * Math.cos(rad);
                const y = 200 + 170 * Math.sin(rad);
                return (
                  <text
                    key={c.label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-base font-bold ${c.label === "N" ? "fill-primary" : "fill-muted-foreground"}`}
                    style={{ fontSize: "16px" }}
                  >
                    {c.label}
                  </text>
                );
              })}

              {/* Tick marks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = i * 10;
                const isMajor = angle % 30 === 0;
                const rad = (angle - 90) * (Math.PI / 180);
                const inner = isMajor ? 178 : 184;
                const x1 = 200 + inner * Math.cos(rad);
                const y1 = 200 + inner * Math.sin(rad);
                const x2 = 200 + 190 * Math.cos(rad);
                const y2 = 200 + 190 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth={isMajor ? 1.5 : 0.6}
                    className="text-border"
                  />
                );
              })}

              {/* Qibla arrow */}
              <g transform={`rotate(${direction} 200 200)`}>
                <path
                  d="M200 50 L215 200 L200 185 L185 200 Z"
                  fill="url(#qibla-grad)"
                  className="drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="qibla-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-gold)" />
                  </linearGradient>
                </defs>
              </g>

              {/* Center medallion */}
              <circle cx="200" cy="200" r="42" fill="var(--color-card)" />
              <circle cx="200" cy="200" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="200" cy="200" r="5" fill="var(--color-primary)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card border border-primary/30 shadow-elevated">
                <span className="font-amiri text-3xl font-bold text-primary leading-none">﷽</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Direction</p>
            <p className="text-5xl font-bold tabular-nums mt-2 text-gradient-primary">{direction}°</p>
            <p className="text-sm text-muted-foreground mt-1">Southeast</p>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 md:grid-cols-3 animate-slide-up stagger-2">
        <div className="rounded-2xl glass-card shadow-soft p-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Your Location</p>
          </div>
          <p className="font-bold mt-2">Mecca, Saudi Arabia</p>
          <p className="text-xs text-muted-foreground mt-1">21.4°N, 39.8°E</p>
        </div>
        <div className="rounded-2xl glass-card shadow-soft p-5">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Distance to Kaaba</p>
          </div>
          <p className="font-bold mt-2">0 km</p>
          <p className="text-xs text-muted-foreground mt-1">You are at the source</p>
        </div>
        <div className="rounded-2xl glass-card shadow-soft p-5">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Accuracy</p>
          </div>
          <p className="font-bold mt-2">High Precision</p>
          <p className="text-xs text-muted-foreground mt-1">GPS + Magnetometer</p>
        </div>
      </div>
    </div>
  );
}
