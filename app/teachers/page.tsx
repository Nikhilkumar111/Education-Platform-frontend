"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Book } from "lucide-react";
import Image from "next/image";
// Mock teacher data until backend is connected
const MOCK_TEACHERS = [
  {
    name: "Mr. Sharma",
    subject: "Mathematics",
    email: "sharma@example.com",
    classes: "Grade 10",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sharma",
  },
  {
    name: "Ms. Verma",
    subject: "Science",
    email: "verma@example.com",
    classes: "Grade 10",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Verma",
  },
  {
    name: "Mrs. Kapoor",
    subject: "English",
    email: "kapoor@example.com",
    classes: "Grade 10",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kapoor",
  },
];


//total teacher list this is 
// not the assigned teacher this is 
export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  // Fetch dynamic teacher list from API
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/teachers"); // Replace with your API
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.log("API unavailable, using mock teachers");
        setTeachers(MOCK_TEACHERS);
      }
    }
    fetchTeachers();
  }, []);
  

  if (!teachers || teachers.length === 0) return <p className="p-6">Loading teachers...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Teachers</h1>
      <p className="text-slate-600">View all your class teachers</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <Card key={index} className="hover:shadow-lg transition">
            <CardHeader className="flex items-center gap-4">
              {/* <Image
                src={teacher.avatarUrl}
                alt={teacher.name}
                className="w-12 h-12 rounded-full border-2 border-blue-400"
              /> */}
              <div>
                <CardTitle className="text-lg font-semibold">{teacher.name}</CardTitle>
                <p className="text-sm text-slate-500">{teacher.subject}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Book className="w-4 h-4 text-slate-500" />
                <Badge variant="outline">{teacher.classes}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
