"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";

// Type for monthly attendance
interface MonthAttendance {
  month: string;
  present: number;
  absent: number;
}

// ⭐ Mock monthly data
const monthMock: MonthAttendance[] = [
  { month: "January", present: 180, absent: 20 },
  { month: "February", present: 160, absent: 25 },
  { month: "March", present: 170, absent: 15 },
  { month: "April", present: 175, absent: 10 },
  { month: "May", present: 160, absent: 20 },
  { month: "June", present: 180, absent: 15 },
];

// Chart colors
const chartConfig = {
  present: { label: "Present", color: "#16a34a" },
  absent: { label: "Absent", color: "#dc2626" },
};

const MonthlyAttendance = () => {
  const [chartData, setChartData] = useState<MonthAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChartData(monthMock);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return (
      <p className="p-4 animate-pulse text-gray-500 font-medium">
        Loading monthly attendance...
      </p>
    );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">📅 Monthly Attendance</h1>
        <div className="flex items-center gap-4">
          <span className="w-3 h-3 rounded-full" style={{ background: chartConfig.present.color }}></span>
          <span className="text-gray-700 text-sm font-medium">Present</span>
          <span className="w-3 h-3 rounded-full" style={{ background: chartConfig.absent.color }}></span>
          <span className="text-gray-700 text-sm font-medium">Absent</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
        <ChartContainer config={chartConfig} className="h-[360px] w-full">
          <BarChart data={chartData} barSize={45}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 13, fill: "#555" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="present"
              fill={chartConfig.present.color}
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
            <Bar
              dataKey="absent"
              fill={chartConfig.absent.color}
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MonthlyAttendance;
