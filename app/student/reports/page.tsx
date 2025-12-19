"use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Download, UserCheck, BookOpen, CheckSquare } from "lucide-react";

// // Mock report data until backend is connected
// const MOCK_REPORT = {
//   overallScore: 92,
//   attendance: 96,
//   subjects: [
//     { name: "Math", score: 95 },
//     { name: "Science", score: 90 },
//     { name: "English", score: 88 },
//     { name: "History", score: 93 },
//   ],
//   assignmentsCompleted: 18,
//   totalAssignments: 20,
//   reportUrl: "/files/student-report.pdf",
// };

// export default function Report() {
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     async function fetchReport() {
//       try {
//         const res = await fetch("/api/report"); // Replace with your backend API
//         if (!res.ok) throw new Error("API Error");
//         const data = await res.json();
//         setReport(data);
//       } catch (err) {
//         console.log("API unavailable, using mock report");
//         setReport(MOCK_REPORT);
//       }
//     }

//     fetchReport();
//   }, []);

//   if (!report) return <p className="p-6">Loading report...</p>;

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = report.reportUrl;
//     link.download = report.reportUrl.split("/").pop() || "report.pdf";
//     link.click();
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-slate-800">Student Report</h1>
//       <p className="text-slate-600">Detailed overview of your academic performance</p>

//       {/* Top Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Overall Score</CardTitle>
//             <BookOpen className="w-5 h-5 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-blue-600">{report.overallScore}%</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Assignments</CardTitle>
//             <CheckSquare className="w-5 h-5 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-lg font-semibold text-slate-700">
//               {report.assignmentsCompleted} / {report.totalAssignments}
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Attendance</CardTitle>
//             <UserCheck className="w-5 h-5 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-purple-600">{report.attendance}%</p>
//           </CardContent>
//         </Card>

//         <Card
//           className="hover:shadow-lg transition cursor-pointer"
//           onClick={handleDownload}
//         >
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Download Report</CardTitle>
//             <Download className="w-5 h-5 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-slate-600">PDF format</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Subject-wise Scores */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold text-slate-800">Subject-wise Performance</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {report.subjects.map((sub, index) => (
//             <Card key={index} className="hover:shadow-lg transition">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">{sub.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-bold text-blue-600">{sub.score}%</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react'

const StudentReport = () => {
  return (
    <div>StudentReport</div>
  )
}

export default StudentReport