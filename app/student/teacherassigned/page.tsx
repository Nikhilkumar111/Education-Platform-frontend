"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useGetStudentSubscriptionsQuery } from "@/store/api/subscription/subscriptionApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useEffect } from "react";

const AssignedTeacherPage = () => {
  const studentId = useSelector((state: any) => state.auth.user?._id);

  const { data, isLoading, isError } = useGetStudentSubscriptionsQuery(studentId, {
    skip: !studentId,
  });

  useEffect(() => {
    if (isError) toast.error("Failed to load assigned teachers");
  }, [isError]);

  if (isLoading)
    return <p className="text-center mt-10 text-lg text-gray-700">Loading assigned teachers...</p>;

  if (isError)
    return <p className="text-center mt-10 text-lg text-red-500">Error loading data</p>;

  const studentName = data?.data?.studentName ?? "Me";
  const assignedTeachers = data?.data?.assignedTeachers ?? [];

  return (
    <div className="max-w-5xl mx-auto py-20 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Assigned Teachers for {studentName}
      </h1>

      {assignedTeachers.length === 0 ? (
        <Card className="p-6 bg-blue-50 border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">No Active Subscription</CardTitle>
            <CardDescription className="text-blue-600">
              You don’t have any active teacher subscriptions.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6">
          {assignedTeachers.map((teacher: any) => (
            <Card
              key={teacher.subscriptionId}
              className="border rounded-2xl shadow-lg hover:shadow-2xl transition-all p-4"
            >
              <CardHeader className="bg-gray-100 rounded-t-2xl p-4">
                <CardTitle className="text-2xl font-bold">{teacher.teacherName ?? "N/A"}</CardTitle>
                <CardDescription>{teacher.subject ?? "General"}</CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Info label="Student" value={studentName} />
                <Info label="Teacher Email" value={teacher.email ?? "N/A"} />
                <Info label="Mode" value={teacher.mode ?? "N/A"} />
                <Info label="Amount Paid" value={`₹${teacher.amount ?? 0}`} />
                <Info
                  label="Subscription Ends"
                  value={teacher.endDate ? new Date(teacher.endDate).toLocaleDateString() : "N/A"}
                />
                <Info
                  label="Grace Period Until"
                  value={teacher.graceEndDate ? new Date(teacher.graceEndDate).toLocaleDateString() : "N/A"}
                />
              </CardContent>

              <CardFooter className="border-t mt-4 text-sm text-gray-600">
                Subscription ID: {teacher.subscriptionId}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Info component for card rows
const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div className="p-2 border-l-4 border-indigo-500 rounded bg-gray-50">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default AssignedTeacherPage;
