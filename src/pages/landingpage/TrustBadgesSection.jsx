import { CheckCircle2, Clock, Star, Award } from "lucide-react";

const trustBadges = [
  {
    icon: CheckCircle2,
    label: "ID Verified",
    description: "Identity confirmed",
    color: "emerald",
  },
  {
    icon: Clock,
    label: "On-Time",
    description: "Shows up on time as a driver or passenger",
    color: "blue",
  },
  {
    icon: Star,
    label: "Highly Rated",
    description: "Consistently rated 4.8+ as driver or rider",
    color: "amber",
  },
  {
    icon: Award,
    label: "Trusted Member",
    description: "100+ successful rides with positive feedback",
    color: "purple",
  },
];

export default function TrustBadgesSection() {
  return (
    <section className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight hl-heading sm:text-4xl">
          Trust badges at a glance
        </h2>
        <p className="mt-3 text-lg hl-body max-w-2xl mx-auto">
          Earn recognition for being verified, reliable, and highly rated as a driver or passenger
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          const colorMap = {
            emerald: "from-emerald-50 to-teal-50/50 dark:from-emerald-500/10 dark:to-teal-500/5 border-emerald-200/50 dark:border-emerald-500/20",
            blue: "from-blue-50 to-cyan-50/50 dark:from-blue-500/10 dark:to-cyan-500/5 border-blue-200/50 dark:border-blue-500/20",
            amber: "from-amber-50 to-orange-50/50 dark:from-amber-500/10 dark:to-orange-500/5 border-amber-200/50 dark:border-amber-500/20",
            purple: "from-purple-50 to-pink-50/50 dark:from-purple-500/10 dark:to-pink-500/5 border-purple-200/50 dark:border-purple-500/20",
          };

          const iconColorMap = {
            emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20",
            blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20",
            amber: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20",
            purple: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/20",
          };

          return (
            <div
              key={badge.label}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${colorMap[badge.color]} border p-6 backdrop-blur-sm transition hover:shadow-md group`}
            >
              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconColorMap[badge.color]} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold hl-heading">{badge.label}</h3>
                <p className="mt-2 text-sm hl-body">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-emerald-50/40 dark:bg-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/20 p-6">
        <p className="text-sm hl-body leading-relaxed">
          <span className="font-semibold hl-heading">How badges work:</span> Drivers and passengers earn trust badges by being verified, showing up on time, maintaining high ratings, and completing rides successfully. Badges build reputation for both sides and make it easier to find trustworthy travel companions.
        </p>
      </div>
    </section>
  );
}
