import { createFileRoute } from "@tanstack/react-router";
import { IslamicHeader } from "../components/dashboard/IslamicHeader";
import { PrayerHero } from "../components/dashboard/PrayerHero";
import { DailyVerse } from "../components/dashboard/DailyVerse";
import { QuickActions } from "../components/dashboard/QuickActions";
import { HabitsSummary } from "../components/dashboard/HabitsSummary";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8 space-y-6">
      <IslamicHeader />
      <PrayerHero />
      <div className="grid gap-6 md:grid-cols-2">
        <DailyVerse />
        <HabitsSummary />
      </div>
      <QuickActions />
    </div>
  );
}
