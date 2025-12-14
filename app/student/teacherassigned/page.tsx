"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

interface AssignedTeacher {
  teacherId: number;
  teacherName: string;
  subject: string;
  email: string;
}

interface StudentAssignedResponse {
  studentId: number;
  studentName: string;
  assignedTeachers: AssignedTeacher[];
}




const mockStudentAssignedData: StudentAssignedResponse = {
  studentId: 21,
  studentName: "Alice Johnson",
  assignedTeachers: [
    {
      teacherId: 1,
      teacherName: "Mr. John Doe",
      subject: "Mathematics",
      email: "john.doe@school.com",
    },
    {
      teacherId: 3,
      teacherName: "Ms. Emily Carter",
      subject: "Science",
      email: "emily.carter@school.com",
    },
  ],
};

const AssignedTeacherPage = () => {
  const [data, setData] = useState<StudentAssignedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockStudentAssignedData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <p>Loading assigned teachers...</p>;
  if (!data) return <p>Error loading data.</p>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center">
        Assigned Teachers for{" "}
        <span className="text-blue-600">{data.studentName } or Me</span>
      </h1>

      {/* If no teacher assigned */}
      {data.assignedTeachers.length === 0 && (
        <Card className="shadow-lg border border-gray-200 rounded-xl p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">No Assigned Teacher</CardTitle>
            <CardDescription className="text-gray-500">
              You are currently not assigned to any teacher.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Attractive Cards */}
      <div className="grid gap-6">
        {data.assignedTeachers.map((teacher) => (
          <Card
            key={teacher.teacherId}
            className="shadow-xl border border-gray-100 rounded-2xl hover:shadow-2xl transition-all p-4 bg-white"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {teacher.teacherName}
              </CardTitle>
              <CardDescription className="text-blue-600 font-medium text-lg">
                {teacher.subject}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">

              {/* Student Section */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-700 mb-1">Student</p>
                <p className="text-sm text-gray-600">{data.studentName}</p>
              </div>

              {/* Teacher Email */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-700 mb-1">Teacher Email</p>
                <p className="text-sm text-gray-600">{teacher.email}</p>
              </div>

            </CardContent>

            <CardFooter className="pt-2 border-t border-gray-200 mt-4">
              <p className="text-sm text-gray-500">
                Teacher ID: {teacher.teacherId}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignedTeacherPage;
