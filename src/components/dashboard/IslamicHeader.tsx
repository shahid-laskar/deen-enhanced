import { format } from "date-fns";

function GeometricDivider() {
  return (
    <svg className="w-32 h-3 text-primary/30 my-2" viewBox="0 0 128 12">
      <line x1="0" y1="6" x2="48" y2="6" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="56,0 64,6 56,12 48,6" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <polygon points="64,2 70,6 64,10 58,6" fill="currentColor" opacity="0.3" />
      <polygon points="72,0 80,6 72,12 64,6" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <line x1="80" y1="6" x2="128" y2="6" stroke="currentColor" strokeWidth="0.5" />
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
    <div className="text-center md:text-left space-y-1">
      <p className="text-sm text-muted-foreground tracking-wide">{gregorian}</p>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
        {greeting} 🤲
      </h2>
      <p className="font-amiri text-lg text-primary/80">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <GeometricDivider />
    </div>
  );
}
