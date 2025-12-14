"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Edit,
  MapPin,
  Phone,
  GraduationCap,
  Users,
  Star,
  BookOpen,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Wallet from "@/components/wallet";
import Messages from "@/components/communication";
import EditProfileForm from "@/components/editeProfileForm";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showMessages, setShowMessages] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock Teacher Data
  const MOCK_TEACHER = {
    id: "t001",
    name: "Ravi Kumar",
    avatar: "/logo.png",
    location: "Delhi, India",
    phone: "+91 9876543210",
    rating: 4.8,
    experience: 7,
    subjects: ["Mathematics", "Physics"],
    studentsAssigned: 32,
    bio: "Passionate Mathematics & Physics tutor with strong experience teaching CBSE & JEE students.",
    qualification: "M.Sc. in Physics",
    offlineAvailable: true,
    address: "Sector 8, Rohini, Delhi",
    upcomingClasses: [
      { subject: "Mathematics", time: "10:00 AM - 11:00 AM" },
      { subject: "Physics", time: "3:00 PM - 4:30 PM" },
    ],
  };

  useEffect(() => {
    setTeacher(MOCK_TEACHER);
    setLoading(false);
  }, []);

  if (loading || !teacher) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-bold animate-pulse">
        Loading Teacher Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200">

      {/* Edit Profile Modal */}
      <EditProfileForm
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentImage={teacher.avatar}
        userType="teacher"
        profile={teacher}
        onSave={(updatedProfile) => setTeacher(updatedProfile)}
      />

      <div className="container mx-auto px-4 py-10">

        {/* HEADER CARD */}
        <Card className="p-8 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-xl border border-yellow-300">
          <div className="flex gap-8 flex-col md:flex-row items-center">
            
            {/* Avatar */}
            <div className="relative">
              <Image
                src={teacher.avatar}
                width={120}
                height={120}
                alt="Teacher Avatar"
                className="rounded-full shadow-lg border-4 border-yellow-500 object-cover"
              />
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-md"
                onClick={() => setShowEditProfile(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-slate-800">
                {teacher.name}
              </h1>

              <div className="mt-3 space-y-1 text-slate-700">
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 text-yellow-600 mr-2" />
                  {teacher.location}
                </p>

                <p className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  {teacher.phone}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold">{teacher.rating}</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <StatCard
            icon={<GraduationCap className="text-blue-700 w-10 h-10" />}
            title="Experience"
            value={`${teacher.experience} Years`}
          />
          <StatCard
            icon={<BookOpen className="text-green-700 w-10 h-10" />}
            title="Subjects"
            value={teacher.subjects.join(", ")}
          />
          <StatCard
            icon={<Users className="text-purple-700 w-10 h-10" />}
            title="Students Assigned"
            value={teacher.studentsAssigned}
          />
        </div>

        {/* ABOUT */}
        <Card className="mt-12 p-6 rounded-3xl shadow-xl bg-white/70 backdrop-blur-md border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold">About</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 leading-relaxed">
            <p>{teacher.bio}</p>

            <div className="mt-4 space-y-1">
              <p><strong>Qualification:</strong> {teacher.qualification}</p>
              <p><strong>Offline Available:</strong> {teacher.offlineAvailable ? "Yes" : "No"}</p>
              <p><strong>Address:</strong> {teacher.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="mt-12 p-6 rounded-3xl shadow-xl bg-white/70 border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {teacher.upcomingClasses.length > 0 ? (
              teacher.upcomingClasses.map((cls: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded-xl mb-3 bg-white/50 hover:bg-yellow-50 transition shadow-sm"
                >
                  <span className="font-medium text-slate-800">{cls.subject}</span>

                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {cls.time}
                  </div>
                </div>
              ))
            ) : (
              <p>No classes scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string | number;
}) {
  return (
    <div className="p-6 rounded-3xl bg-white shadow-xl border hover:shadow-2xl transition cursor-pointer hover:-translate-y-1">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-extrabold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
