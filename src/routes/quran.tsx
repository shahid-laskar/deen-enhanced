import { createFileRoute } from "@tanstack/react-router";
import { Search, BookOpen, Bookmark, Play, Clock } from "lucide-react";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "Quran — Deen" },
      { name: "description", content: "Read and listen to the Holy Quran with Arabic text and translations." },
    ],
  }),
  component: QuranPage,
});

const surahs = [
  { num: 1, name: "Al-Fatihah", arabic: "الفاتحة", meaning: "The Opening", verses: 7, type: "Meccan" },
  { num: 2, name: "Al-Baqarah", arabic: "البقرة", meaning: "The Cow", verses: 286, type: "Medinan" },
  { num: 3, name: "Aal-E-Imran", arabic: "آل عمران", meaning: "Family of Imran", verses: 200, type: "Medinan" },
  { num: 4, name: "An-Nisa", arabic: "النساء", meaning: "The Women", verses: 176, type: "Medinan" },
  { num: 5, name: "Al-Maidah", arabic: "المائدة", meaning: "The Table", verses: 120, type: "Medinan" },
  { num: 6, name: "Al-An'am", arabic: "الأنعام", meaning: "The Cattle", verses: 165, type: "Meccan" },
  { num: 7, name: "Al-A'raf", arabic: "الأعراف", meaning: "The Heights", verses: 206, type: "Meccan" },
  { num: 18, name: "Al-Kahf", arabic: "الكهف", meaning: "The Cave", verses: 110, type: "Meccan" },
  { num: 36, name: "Ya-Sin", arabic: "يس", meaning: "Ya Sin", verses: 83, type: "Meccan" },
  { num: 55, name: "Ar-Rahman", arabic: "الرحمن", meaning: "The Merciful", verses: 78, type: "Medinan" },
  { num: 67, name: "Al-Mulk", arabic: "الملك", meaning: "The Sovereignty", verses: 30, type: "Meccan" },
  { num: 112, name: "Al-Ikhlas", arabic: "الإخلاص", meaning: "The Sincerity", verses: 4, type: "Meccan" },
];

function QuranPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="animate-slide-up">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Holy Book</p>
        <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Al-Quran al-Karim</h1>
        <p className="text-sm text-muted-foreground mt-2">Read, listen, and reflect upon the words of Allah</p>
      </div>

      {/* Continue reading hero */}
      <div className="relative overflow-hidden rounded-3xl shadow-elevated animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-warm to-primary/80" />
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200">
          <defs>
            <pattern id="quran-geo" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M16 0L32 16L16 32L0 16Z" fill="none" stroke="white" strokeWidth="0.6" />
              <circle cx="16" cy="16" r="3" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quran-geo)" />
        </svg>
        <div className="relative p-8 md:p-10 text-primary-foreground">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold opacity-80">
            <Clock className="h-3.5 w-3.5" />
            Continue Reading
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold mt-3">Surah Al-Kahf</h2>
          <p className="font-amiri text-2xl mt-1 opacity-90">سورة الكهف</p>
          <div className="flex items-center gap-4 mt-6 text-sm">
            <span className="opacity-80">Verse 24 of 110</span>
            <div className="flex-1 max-w-xs h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full shadow-glow-gold" style={{ width: "22%" }} />
            </div>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/15 backdrop-blur-md hover:bg-white/25 px-5 py-2.5 text-sm font-bold transition-all border border-white/20">
            <Play className="h-4 w-4 fill-current" />
            Resume
          </button>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex items-center gap-3 animate-slide-up stagger-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search surahs, verses, or topics..."
            className="w-full rounded-2xl glass-card pl-11 pr-4 py-3 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-sm font-bold shadow-glow-primary hover:opacity-90 transition-all">
          <Bookmark className="h-4 w-4" />
          Bookmarks
        </button>
      </div>

      {/* Surah list */}
      <div className="grid gap-3 md:grid-cols-2 animate-slide-up stagger-3">
        {surahs.map((s) => (
          <button
            key={s.num}
            className="group relative overflow-hidden rounded-2xl glass-card shadow-soft hover:shadow-elevated card-hover p-4 text-left flex items-center gap-4"
          >
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <svg viewBox="0 0 56 56" className="absolute inset-0">
                <path
                  d="M28 2L52 16V40L28 54L4 40V16Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-primary/40 group-hover:text-primary transition-colors"
                />
              </svg>
              <span className="font-amiri text-lg font-bold text-primary">{s.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h3 className="font-bold truncate">{s.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{s.type}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{s.meaning} · {s.verses} verses</p>
            </div>
            <div className="font-amiri text-2xl text-foreground/80 group-hover:text-primary transition-colors">{s.arabic}</div>
          </button>
        ))}
      </div>

      <div className="text-center animate-slide-up stagger-4">
        <button className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
          <BookOpen className="h-4 w-4" />
          View all 114 surahs →
        </button>
      </div>
    </div>
  );
}
