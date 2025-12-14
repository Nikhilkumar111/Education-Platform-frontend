"use client";

import React, { useEffect, useState } from "react";

interface StudentRank {
  id: number;
  name: string;
  score: number;
  avatar?: string; // optional image
}

const mockLeaderboard: StudentRank[] = [
  { id: 1, name: "Alice Johnson", score: 980, avatar: "👩‍🎓" },
  { id: 2, name: "Bob Smith", score: 950, avatar: "👨‍🎓" },
  { id: 3, name: "You", score: 940, avatar: "🫵" },
  { id: 4, name: "David Lee", score: 920, avatar: "👨‍🎓" },
  { id: 5, name: "Emma Watson", score: 900, avatar: "👩‍🎓" },
  { id: 6, name: "Frank Miller", score: 880, avatar: "👨‍🎓" },
];



const LeaderboardCompetingAll = () => {
  const [leaderboard, setLeaderboard] = useState<StudentRank[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = 3; // Example: logged-in user

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <p className="p-4 animate-pulse">Loading leaderboard...</p>;

  return (
    <div className="p-15">
      <h1 className="text-2xl font-bold mb-6">🏆 Global Leaderboard</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-gray-100 px-6 py-3 font-semibold text-gray-700">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-1"></span>
          <span className="col-span-6">Name</span>
          <span className="col-span-4 text-right">Score</span>
        </div>

        {/* Table Rows */}
        {leaderboard.map((student, index) => {
          const isCurrentUser = student.id === currentUserId;
          return (
            <div
              key={student.id}
              className={`grid grid-cols-12 gap-4 px-6 py-3 items-center border-b transition-all ${
                isCurrentUser ? "bg-yellow-100 font-bold" : "hover:bg-gray-50"
              }`}
            >
              <span className="col-span-1 text-center">{index + 1}</span>
              <span className="col-span-1 text-center text-2xl">{student.avatar}</span>
              <span className="col-span-6">{student.name}</span>
              <span className="col-span-4 text-right">{student.score}</span>
            </div>
          );
        })}
      </div>

      {/* Current User Highlight */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm flex justify-between items-center">
        <p className="font-medium">
          🌟 You are ranked{" "}
          <span className="font-bold">
            {leaderboard.findIndex((s) => s.id === currentUserId) + 1}
          </span>{" "}
          out of {leaderboard.length} students
        </p>
        <p className="font-semibold text-blue-600">
          Score: {leaderboard.find((s) => s.id === currentUserId)?.score}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardCompetingAll;
