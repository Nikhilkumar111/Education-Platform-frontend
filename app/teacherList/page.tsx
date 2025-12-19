"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetAllTeachersQuery } from "@/store/api/teacher/teacherApi";

const TeacherList = () => {
  const { data, isLoading, error } = useGetAllTeachersQuery();
  const [filterSubject, setFilterSubject] = useState<string>("All");

  if (isLoading) {
    return (
      <p className="text-center text-lg mt-12 text-gray-600">
        Loading teachers...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-12">
        Failed to load teachers
      </p>
    );
  }

  const teachers = data?.data?.teachers || [];

  if (teachers.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">
        No teachers found
      </p>
    );
  }

  // ================= Normalize subjects =================
  // Flatten all subjects and normalize to lowercase for comparison
  const allSubjectsSet = new Set(
    teachers
      .flatMap((t: any) => t.subjectsChosen || [])
      .map((s: string) => s.toLowerCase())
  );

  // Convert to array with capitalized first letter for display
  // const allSubjects = Array.from(allSubjectsSet).map(
  //   (s) => s.charAt(0).toUpperCase() + s.slice(1)
  // );

const allSubjects = Array.from(allSubjectsSet).map((s) => {
  const subject = s as string;
  return subject.charAt(0).toUpperCase() + subject.slice(1);
});






  // ================= Filter teachers by subject =================
  const filteredTeachers = teachers.filter((teacher: any) => {
    if (filterSubject === "All") return true;

    // Compare normalized subject strings
    return teacher.subjectsChosen?.some(
      (sub: string) => sub.toLowerCase() === filterSubject.toLowerCase()
    );
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-slate-800 mb-6 text-center">
        Our Teachers
      </h2>

      {/* Filter */}
      <div className="mb-6 flex justify-center gap-4">
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="All">All Subjects</option>
          {allSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredTeachers.map((teacher: any) => (
          <Link
            key={teacher._id}
            href={`/teachers/${teacher._id}`}
            className="bg-white rounded-2xl shadow-md p-6 text-center 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Image
              src={teacher.user?.avatar || "/avatar.png"}
              alt={teacher.user?.name}
              width={96}
              height={96}
              className="mx-auto rounded-full object-cover border-4 border-slate-100"
            />

            <h3 className="mt-4 text-2xl font-semibold text-slate-800">
              {teacher.user?.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {teacher.qualification || "Qualification not set"}
            </p>

            {/* Subjects */}
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">Subjects:</span>{" "}
              {teacher.subjectsChosen
                ?.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
                .join(", ") || "Not set"}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {teacher.experience || 0} years experience
            </p>

            <p className="mt-3 text-sm text-slate-600">
              📍 {teacher.location || "Location not set"}
            </p>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {teacher.bio || "No bio available"}
            </p>

            <p className="mt-3 text-sm font-medium text-yellow-600">
              ⭐ {teacher.ratings || 0} Ratings
            </p>

            <p className="mt-2 text-sm text-slate-600">
              🏫 Offline:{" "}
              <span className="font-medium">
                {teacher.offlineAvailable ? "Available" : "Not Available"}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TeacherList;
