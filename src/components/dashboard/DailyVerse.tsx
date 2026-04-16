import { BookOpen } from "lucide-react";

const VERSE = {
  arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  translation: "Indeed, with hardship comes ease.",
  reference: "Surah Ash-Sharh (94:6)",
};

export function DailyVerse() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-soft card-hover animate-slide-up stagger-3 group">
      {/* Decorative corners */}
      <svg className="absolute top-0 left-0 w-24 h-24 text-gold/15" viewBox="0 0 96 96">
        <path d="M0 0L48 0L0 48Z" fill="currentColor" />
        <path d="M0 0L24 0L0 24Z" fill="currentColor" opacity="0.4" />
        <path d="M12 0L48 0L48 12L24 12L12 24L0 24L0 12Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-24 h-24 text-gold/15 rotate-180" viewBox="0 0 96 96">
        <path d="M0 0L48 0L0 48Z" fill="currentColor" />
        <path d="M0 0L24 0L0 24Z" fill="currentColor" opacity="0.4" />
      </svg>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-gold)_0%,transparent_70%)] opacity-[0.04]" />

      <div className="relative z-10 space-y-5">
        <div className="flex items-center gap-2.5 text-gold">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10">
            <BookOpen className="h-3.5 w-3.5" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Verse of the Day</span>
        </div>

        <div className="text-center space-y-4 py-3">
          <p className="font-amiri text-3xl md:text-[2rem] leading-[1.8] text-foreground" dir="rtl">
            {VERSE.arabic}
          </p>
          <div className="mx-auto w-20 h-px animate-shimmer" />
          <p className="text-base text-foreground/75 italic leading-relaxed">
            "{VERSE.translation}"
          </p>
          <p className="text-[11px] text-muted-foreground font-semibold tracking-wide">{VERSE.reference}</p>
        </div>
      </div>
    </div>
  );
}
