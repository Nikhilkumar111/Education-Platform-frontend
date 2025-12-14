"use client";

import { useEffect, useState } from "react";

// Type for achievement
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string; // emoji or icon URL
  earned: boolean; // true if student earned it
}

// ⭐ Mock data
const mockAchievements: Achievement[] = [
  { id: 1, title: "Math Whiz", description: "Completed all math exercises", icon: "🧮", earned: true },
  { id: 2, title: "Science Star", description: "Top scorer in science quiz", icon: "🔬", earned: true },
  { id: 3, title: "Perfect Attendance", description: "No absences in a month", icon: "📅", earned: false },
  { id: 4, title: "Reading Champion", description: "Read 10 books", icon: "📚", earned: true },
  { id: 5, title: "Sports Medal", description: "Won the sports competition", icon: "🏅", earned: false },
];

const AchievementsBadges = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAchievements(mockAchievements);
    }, 400);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">🏆 Your Achievements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-4 rounded-xl shadow-md transition-all hover:scale-105
              ${badge.earned ? "bg-green-50 border border-green-300" : "bg-gray-100 border border-gray-300 opacity-50"}
            `}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h2 className="font-semibold text-center">{badge.title}</h2>
            <p className="text-sm text-gray-600 text-center">{badge.description}</p>
            {badge.earned && (
              <span className="mt-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                Earned
              </span>
            )}
            {!badge.earned && (
              <span className="mt-2 text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                Locked
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsBadges;
