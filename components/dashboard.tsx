"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, School, Mail  } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateProfileForm from "./UpdateProfileForm";

interface DashboardProps {
  name: string;
  grade: string;
  school: string;
  location: string;
  avatarUrl: string;
  Email: string;
  overallScore: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  attendance: number;
  walletBalance: number;
  subjectsChosen: string[];
}

const Dashboard: React.FC<DashboardProps> = (initialProps) => {
  const [profileData, setProfileData] = useState(initialProps);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);

  const handleCloseForm = (updatedData?: Partial<DashboardProps>) => {
    setIsEditing(false);
    if (updatedData) {
      setProfileData((prev) => ({ ...prev, ...updatedData }));
    }
  };

  return (
    <div className="p-12 space-y-8">
 


 <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
  
  {/* Avatar */}
  <Avatar className="w-28 h-28 border-4 border-blue-500">
    <AvatarImage src={profileData.avatarUrl} />
    <AvatarFallback className="text-xl font-semibold">
      {profileData.name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </AvatarFallback>
  </Avatar>

  {/* Profile Info */}
  <div className="flex-2 text-center md:text-left">
    
    {/* Name */}
    <h2 className="text-3xl font-bold text-slate-800">
      {profileData.name}
    </h2>

<p className="mt-2 flex items-center gap-2 justify-center md:justify-start
             text-lg md:text-xl font-medium text-slate-600">
  <span className="font-semibold text-slate-800">Class</span>
  {/* <span className="text-2xl md:text-3xl font-bold text-indigo-600"> */}
    - {profileData.grade}th
  {/* </span> */}
</p>





    {/* School */}
    <p className="text-lg text-slate-600 mt-1">
      {profileData.school || "N/A"}
    </p>

    {/* Details */}
    <div className="mt-4 flex flex-col sm:flex-row gap-6 text-base text-slate-700 justify-center md:justify-start">
      
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        <span className="font-medium">
          {profileData.location || "N/A"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <School className="w-5 h-5 text-green-600" />
        <span className="font-medium">
          {profileData.school || "N/A"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-purple-600" />
        <span className="font-medium">
          {profileData.Email || "N/A"}
        </span>
      </div>
    </div>

    {/* Subjects */}
    <div className="mt-4 text-base text-gray-800">
      <strong className="text-lg">Subjects:</strong>{" "}
      {profileData.subjectsChosen.length
        ? profileData.subjectsChosen.join(", ")
        : "Not set"}
    </div>

    {/* Button */}
    <button
      onClick={handleEditClick}
      className="mt-6 px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Update Profile
    </button>
  </div>
</div>

      {/* ================= Stats Section ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {profileData.overallScore || 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {profileData.assignmentsCompleted || 0} /{" "}
              {profileData.totalAssignments || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>Present rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">
              {profileData.attendance || 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet */}
      {/* <div className="text-center font-semibold">
        Wallet Balance: ₹{profileData.walletBalance || 0}
      </div> */}

      {/* Update Profile Modal */}
      {isEditing && (
        <UpdateProfileForm
          initialData={{
            name: profileData.name,
            Email: profileData.Email,
            grade: profileData.grade,
            location: profileData.location,
            school: profileData.school,
            subjectsChosen: profileData.subjectsChosen,
            avatarUrl: profileData.avatarUrl,
          }}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
