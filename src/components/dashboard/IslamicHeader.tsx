import { format } from "date-fns";

function GeometricDivider() {
  return (
    <svg className="w-40 h-4 text-primary/25 my-2" viewBox="0 0 160 16">
      <line x1="0" y1="8" x2="56" y2="8" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="64,1 72,8 64,15 56,8" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <polygon points="72,3 78,8 72,13 66,8" fill="currentColor" opacity="0.25" />
      <polygon points="80,1 88,8 80,15 72,8" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <polygon points="96,1 104,8 96,15 88,8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="104" y1="8" x2="160" y2="8" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Peace be upon you";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Peace be upon you";
}

export function IslamicHeader() {
  const today = new Date();
  const greeting = getGreeting();
  const gregorian = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div className="text-center md:text-left space-y-2 animate-slide-up stagger-1">
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <p className="text-sm text-muted-foreground tracking-wide font-medium">{gregorian}</p>
        <span className="hidden md:inline text-muted-foreground/30">•</span>
        <p className="text-xs text-muted-foreground/60 font-amiri tracking-wide">٢٣ رمضان ١٤٤٧</p>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {greeting} <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">🤲</span>
      </h2>
      <p className="font-amiri text-xl text-primary/70 leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <GeometricDivider />
    </div>
  );
}
