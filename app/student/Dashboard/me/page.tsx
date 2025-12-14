"use client";

import Dashboard from "@/components/dashboard";
import { Wallet } from "@/components/wallet";
import { Communication } from "@/components/communication";
import { useGetStudentProfileQuery } from "@/store/api/student/studentApi";

const StudentDashboard = () => {
  // ✅ NO ARGUMENT PASSED
const { data, isLoading, isError } = useGetStudentProfileQuery();

const profile = data?.data?.profile; // ✅ correct

console.log("DATA FROM API:", data); // see what actually comes
console.log("PROFILE 👉", profile);


  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load student profile
      </p>
    );
  }



  // Map backend → Dashboard props
const passingArgs = {
  name: profile?.user?.name || "Student",
  Email: profile?.user?.email || "N/A",

  // ✅ FIXED
  grade: profile?.grade || "N/A",

  school: profile?.school || "N/A",
  location: profile?.location || "N/A",

  // ✅ FIXED AVATAR
  avatarUrl: profile?.avatar || profile?.user?.avatar || "",

  subjectsChosen: profile?.subjectsChosen || [],

  overallScore: profile?.performance || 0,
  assignmentsCompleted: profile?.assignment || 0,
  totalAssignments: 10,
  attendance: profile?.attendance || 0,
  walletBalance: profile?.walletBalance || 0,
};











  return (
    <div>
      <Dashboard {...passingArgs} />

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center sm:items-start ">
    <Wallet userId={profile?.user?._id} />

        <Communication
          onOpenMessages={() => console.log("Messages opened")}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
