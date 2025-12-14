"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// COLORS
const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#06b6d4", "#e11d48"];

// -------------------------------------------------------
// MOCK DATA (Used until backend is connected)
// -------------------------------------------------------
const MOCK_DATA = {
  monthlyScores: [
    { month: "Jan", score: 75 },
    { month: "Feb", score: 80 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 85 },
    { month: "May", score: 88 },
    { month: "Jun", score: 92 },
  ],

  subjectScores: [
    { subject: "Math", score: 90 },
    { subject: "Science", score: 85 },
    { subject: "English", score: 78 },
    { subject: "History", score: 82 },
    { subject: "Coding", score: 95 },
  ],

  attendance: [
    { label: "Present", value: 92 },
    { label: "Absent", value: 8 },
  ],

  progress: [
    { value: 85, fill: "#4f46e5" },
  ],
};

export default function Performance() {
  const [data, setData] = useState(null);




  
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/performance"); // backend route
        if (!res.ok) throw new Error("API error");

        const apiData = await res.json();
        setData(apiData);
      } catch (error) {
        console.log("API unavailable → using demo data.");
        setData(MOCK_DATA); // fallback mock data
      }
    }

    loadData();
  }, []);


  

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Performance</h1>
        <p className="text-slate-600">A detailed breakdown of your academic analytics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LINE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Academic Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyScores}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* BAR CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.subjectScores}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {data.subjectScores.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.attendance}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {data.attendance.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* RADIAL PROGRESS */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="40%"
                  outerRadius="100%"
                  data={data.progress}
                  startAngle={90}
                  endAngle={-360}
                >
                  <RadialBar dataKey="value" cornerRadius={8} background />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
