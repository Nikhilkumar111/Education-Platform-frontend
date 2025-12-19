"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  // Edit,
  MapPin,
  Phone,
  GraduationCap,
  Users,
  Star,
  BookOpen,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import UpdateProfileFormTeacher from "@/components/UpdateProfileFormTeacher";
import { useGetTeacherProfileQuery } from "@/store/api/teacher/teacherApi";

const TeacherDashboard = () => {
  const { data, isLoading } = useGetTeacherProfileQuery();
  const profile = data?.data?.profile;

  const [teacher, setTeacher] = useState<any>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  /* 🔄 SYNC API → LOCAL STATE */
  useEffect(() => {
    if (profile) {
      setTeacher({
        name: profile.user?.name || "",
        email: profile.user?.email || "",
        phone: profile.phone || "",
        qualification: profile.qualification || "",
        experience: profile.experience || 0,
        subjectsChosen: profile.subjectsChosen || [],
        location: profile.location || "N/A",
        rating: profile.ratings || 0,
        studentsAssigned: profile.studentsAssigned || 0,
        avatarUrl: profile.avatar || profile.user?.avatar || "",
        bio: profile.bio || "",
        pricePerMonth: profile.pricePerMonth || 0,
        offlineAvailable: profile.offlineAvailable ?? false,
      });
    }
  }, [profile]);

  if (isLoading || !teacher) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold animate-pulse">
        Loading Teacher Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">

      {/* 🔥 UPDATE PROFILE MODAL */}
      <UpdateProfileFormTeacher
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={profile}
        onSave={(updatedProfile) => {
          setTeacher((prev: any) => ({ ...prev, ...updatedProfile }));
          setShowEditProfile(false);
        }}
      />

      <div className="container mx-auto px-4 py-10">

        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-white shadow-xl rounded-3xl">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">

              {/* AVATAR */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 260 }}
                >
                  <Avatar className="w-28 h-28 border-4 border-blue-500 shadow-xl">
                    <AvatarImage
                      src={teacher.avatarUrl || "/avatar.png"}
                      alt={teacher.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-bold">
                      {teacher.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                {/* EDIT ICON */}
                {/* <Button
                  size="icon"
                  onClick={() => setShowEditProfile(true)}
                  className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-md"
                >
                  <Edit className="w-4 h-4 text-white" />
                </Button> */}
              </div>

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-slate-800">
                  {teacher.name}
                </h1>

                <p className="text-slate-600 mt-1">
                  {teacher.qualification}
                </p>

                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {teacher.subjectsChosen.map((sub: string, i: number) => (
                    <Badge key={i} className="bg-yellow-100 text-slate-800">
                      {sub}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 mt-4 justify-center md:justify-start text-slate-700">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-yellow-600" />
                    {teacher.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    {teacher.phone}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{teacher.rating}</span>
                  <span className="text-slate-500">/ 5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= UPDATE BUTTON ================= */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <StatCard
            icon={<GraduationCap className="text-blue-600" />}
            title="Experience"
            value={`${teacher.experience} Years`}
          />
          <StatCard
            icon={<BookOpen className="text-green-600" />}
            title="Subjects"
            value={teacher.subjectsChosen.length}
          />
          <StatCard
            icon={<Users className="text-purple-600" />}
            title="Students Assigned"
            value={teacher.studentsAssigned}
          />

               <StatCard
            icon={<Users className="text-purple-600" />}
            title="Price perMonth"
            value={teacher.pricePerMonth}
          />
        </div>

        {/* ================= ABOUT ================= */}
        <Card className="mt-12 rounded-3xl shadow-lg bg-white border">
          <CardContent className="p-6 space-y-2 text-slate-700">
            <h2 className="text-xl font-bold">About</h2>
            <p>{teacher.bio}</p>
            <p>
              <strong>Offline Available:</strong>{" "}
              {teacher.offlineAvailable ? "Yes" : "No"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function StatCard({ icon, title, value }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="p-6 rounded-3xl bg-white shadow-lg border">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <p className="text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default TeacherDashboard;
