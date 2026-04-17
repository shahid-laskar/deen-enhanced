import { createFileRoute } from "@tanstack/react-router";
import { User, Bell, Globe, Moon, Shield, HelpCircle, ChevronRight, MapPin, BookOpen } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Deen" },
      { name: "description", content: "Manage your account, prayer preferences, notifications, and app settings." },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  {
    title: "Preferences",
    items: [
      { icon: MapPin, label: "Location", value: "Mecca, Saudi Arabia" },
      { icon: BookOpen, label: "Calculation Method", value: "Umm al-Qura" },
      { icon: Globe, label: "Language", value: "English" },
      { icon: Moon, label: "Appearance", value: "System" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Adhan Reminders", value: "All 5 prayers", toggle: true },
      { icon: Bell, label: "Daily Verse", value: "After Fajr", toggle: true },
      { icon: Bell, label: "Habit Reminders", value: "Off", toggle: false },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", value: "Abdullah" },
      { icon: Shield, label: "Privacy & Security" },
      { icon: HelpCircle, label: "Help & Support" },
    ],
  },
];

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-10 space-y-8">
      <div className="animate-slide-up">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">Configuration</p>
        <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-2 text-gradient-primary">Settings</h1>
        <p className="text-sm text-muted-foreground mt-2">Customize your Deen experience</p>
      </div>

      {/* Profile card */}
      <div className="relative overflow-hidden rounded-3xl shadow-elevated animate-slide-up stagger-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-warm to-primary/80" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 400 200">
          <defs>
            <pattern id="settings-geo" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M18 0L36 18L18 36L0 18Z" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#settings-geo)" />
        </svg>
        <div className="relative p-6 md:p-8 flex items-center gap-5 text-primary-foreground">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 shadow-elevated">
            <span className="font-amiri text-3xl font-bold">ع</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Abdullah</h2>
            <p className="text-sm opacity-80 mt-0.5">abdullah@example.com</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                47 day streak 🔥
              </span>
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                Member since 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, sIdx) => (
        <div key={section.title} className={`animate-slide-up stagger-${sIdx + 2}`}>
          <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground px-2 mb-3">{section.title}</h3>
          <div className="rounded-2xl glass-card shadow-soft overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-all text-left ${
                  i !== section.items.length - 1 ? "border-b border-border/40" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.label}</p>
                  {item.value && <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>}
                </div>
                {item.toggle !== undefined ? (
                  <div className={`relative h-6 w-11 rounded-full transition-all ${item.toggle ? "bg-primary" : "bg-muted"}`}>
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-all ${
                        item.toggle ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </div>
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center text-xs text-muted-foreground pb-4">
        <p className="font-amiri text-base text-primary/60">بسم الله</p>
        <p className="mt-2 font-semibold">Deen v1.0 · Made with care</p>
      </div>
    </div>
  );
}
