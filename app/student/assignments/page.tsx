"use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, FileText, User, Download, Eye } from "lucide-react";

// Mock data until backend is connected
// const MOCK_ASSIGNMENTS = [
//   {
//     title: "Math - Algebra Homework",
//     subject: "Math",
//     teacher: "Mr. Sharma",
//     dueDate: "2025-12-12",
//     status: "Pending",
//     description: "Complete exercises 1-10 from Chapter 5.",
//     fileUrl: "/files/math-algebra.pdf"
//   },
//   {
//     title: "Science - Lab Report",
//     subject: "Science",
//     teacher: "Ms. Verma",
//     dueDate: "2025-12-14",
//     status: "Completed",
//     description: "Submit your lab report on chemical reactions.",
//     fileUrl: "/files/science-lab.pdf"
//   },
//   {
//     title: "English - Essay Writing",
//     subject: "English",
//     teacher: "Mrs. Kapoor",
//     dueDate: "2025-12-15",
//     status: "Pending",
//     description: "Write a 500-word essay on 'The Importance of Reading'.",
//     fileUrl: "/files/english-essay.pdf"
//   },
// ];

// export default function Assignment() {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     async function fetchAssignments() {
//       try {
//         const res = await fetch("/api/assignments");
//         if (!res.ok) throw new Error("API Error");
//         const data = await res.json();
//         setAssignments(data);
//       } catch (err) {
//         console.log("API unavailable, using mock assignments");
//         setAssignments(MOCK_ASSIGNMENTS);
//       }
//     }
//     fetchAssignments();
//   }, []);

//   if (!assignments || assignments.length === 0) return <p className="p-6">Loading assignments...</p>;

//   const handleDownload = (url: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = url.split("/").pop() || "assignment.pdf";
//     link.click();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-slate-800">Assignments</h1>
//       <p className="text-slate-600">View, download, and submit your class assignments</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {assignments.map((assignment, index) => (
//           <Card key={index} className="hover:shadow-lg transition relative">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold">{assignment.title}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex items-center gap-2 text-slate-700">
//                 <FileText className="w-4 h-4 text-slate-500" />
//                 <Badge variant="outline">{assignment.subject}</Badge>
//               </div>
//               <div className="flex items-center gap-2 text-slate-700">
//                 <User className="w-4 h-4 text-slate-500" />
//                 <span>{assignment.teacher}</span>
//               </div>
//               <div className="flex items-center gap-2 text-slate-700">
//                 <Calendar className="w-4 h-4 text-slate-500" />
//                 <Badge variant={assignment.status === "Completed" ? "secondary" : "default"}>
//                   {assignment.dueDate}
//                 </Badge>
//               </div>
//               <p className="text-sm text-slate-600">{assignment.description}</p>

//               {/* PDF Actions */}
//               {assignment.fileUrl && (
//                 <div className="flex gap-3 mt-2">
//                   <button
//                     onClick={() => window.open(assignment.fileUrl, "_blank")}
//                     className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
//                   >
//                     <Eye className="w-4 h-4" /> View
//                   </button>
//                   <button
//                     onClick={() => handleDownload(assignment.fileUrl)}
//                     className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
//                   >
//                     <Download className="w-4 h-4" /> Download
//                   </button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }






const AssignmentForStudent = () => {
  return (
    <div>AssignmentForStudent</div>
  )
}

export default AssignmentForStudent