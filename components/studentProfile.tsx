"use client"

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import  EditProfileForm  from "./editeProfileForm";
import { Edit, MapPin, School } from "lucide-react";

export function StudentProfile() {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@student.com",
    phone: "+91 87654 32109",
    class: "Grade 10",
    school: "Delhi Public School",
    section: "A",
    rollNumber: "DPS2024-156",
    location: "South Delhi",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  });

  return (
    <div className="p-4">
      {/* Edit Profile Form */}
      <EditProfileForm
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentImage={studentData.avatarUrl}
        userType="student"
        profile={studentData}
        onSave={(updatedProfile) => setStudentData(updatedProfile)}
      />

      {/* Profile Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white max-w-3xl mx-auto">
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-blue-400">
              <AvatarImage src={studentData.avatarUrl} />
              <AvatarFallback>
                {studentData.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full bg-blue-500 hover:bg-blue-600 h-8 w-8"
              onClick={() => setShowEditProfile(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {studentData.name}
            </h2>
            <p className="text-slate-600 mb-2">
              {studentData.class} • {studentData.school}
            </p>

            {/* Roll Number & Section */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-slate-800">
                Roll No: {studentData.rollNumber}
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                Section {studentData.section}
              </Badge>
            </div>

            {/* Location & School */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start text-sm text-slate-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{studentData.location}</span>
              </div>
              <div className="flex items-center">
                <School className="w-4 h-4 mr-1" />
                <span>{studentData.school}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="border-blue-300 hover:bg-blue-50"
              onClick={() => setShowEditProfile(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
