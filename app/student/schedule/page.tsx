"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, MapPin } from "lucide-react";

// Mock schedule until backend is connected
// till the backend will not connect this will shows as it is 

const MOCK_SCHEDULE = [
  { time: "09:00 AM - 10:00 AM", subject: "Math", teacher: "Mr. Sharma", room: "A101", color: "from-blue-500 to-blue-300" },
  { time: "10:15 AM - 11:15 AM", subject: "Science", teacher: "Ms. Verma", room: "B202", color: "from-green-500 to-green-300" },
  { time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Mrs. Kapoor", room: "C303", color: "from-purple-500 to-purple-300" },
  { time: "01:30 PM - 02:30 PM", subject: "History", teacher: "Mr. Singh", room: "D404", color: "from-yellow-500 to-yellow-300" },
];

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);


  // Fetch dynamic schedule data from API
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch("/api/schedule");
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.log("API unavailable, using demo schedule");
        setSchedule(MOCK_SCHEDULE);
      }
    }

    fetchSchedule();
  }, []);

  if (!schedule || schedule.length === 0) return <p className="p-6">Loading schedule...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Today's Schedule</h1>
      <p className="text-slate-600">View your classes for the day</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((item, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden relative hover:scale-105 transition-transform duration-300 shadow-lg`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20`} />
            <CardHeader>
              <CardTitle className="text-lg font-bold z-10 relative">{item.subject}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 z-10 relative">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-slate-500" />
                <Badge variant="outline">{item.time}</Badge>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-4 h-4 text-slate-500" />
                <span>{item.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-500" />
                <Badge variant="secondary">{item.room}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
