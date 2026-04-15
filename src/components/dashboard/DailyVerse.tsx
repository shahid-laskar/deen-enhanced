import { BookOpen, RefreshCw } from "lucide-react";

const VERSE = {
  arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  translation: "Indeed, with hardship comes ease.",
  reference: "Surah Ash-Sharh (94:6)",
};

export function DailyVerse() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
      {/* Geometric corner */}
      <svg className="absolute top-0 left-0 w-20 h-20 text-gold/20" viewBox="0 0 80 80">
        <path d="M0 0L40 0L0 40Z" fill="currentColor" />
        <path d="M0 0L20 0L0 20Z" fill="currentColor" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-20 h-20 text-gold/20 rotate-180" viewBox="0 0 80 80">
        <path d="M0 0L40 0L0 40Z" fill="currentColor" />
        <path d="M0 0L20 0L0 20Z" fill="currentColor" opacity="0.5" />
      </svg>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gold">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">Verse of the Day</span>
          </div>
        </div>

        <div className="text-center space-y-3 py-2">
          <p className="font-amiri text-2xl md:text-3xl leading-relaxed text-foreground" dir="rtl">
            {VERSE.arabic}
          </p>
          <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="text-base text-foreground/80 italic">
            "{VERSE.translation}"
          </p>
          <p className="text-xs text-muted-foreground font-medium">{VERSE.reference}</p>
        </div>
      </div>
    </div>
  );
}
