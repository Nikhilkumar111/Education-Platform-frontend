"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetTeacherByIdQuery } from "@/store/api/teacher/teacherApi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const TeacherProfilePage = () => {

  
     const router = useRouter();



  const params = useParams();
  const teacherId = params.id as string;

  const { data, isLoading, error } = useGetTeacherByIdQuery(teacherId);

  if (isLoading) {
    return (
      <p className="text-center mt-16 text-lg text-gray-600">
        Loading teacher profile...
      </p>
    );
  }

  if (error || !data?.data?.teacher) {
    return (
      <p className="text-center mt-16 text-red-500">
        Failed to load teacher profile
      </p>
    );
  }


const handleAssignTeacher = async () => {

      toast.success("Redirect to assign-teacher page");
     router.push(`/assign-teacher/${teacherId}`);

};




  const teacher = data.data.teacher;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">




     
      <div className="bg-green-50 rounded-2xl shadow-lg p-10">

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={teacher.user?.avatar || "/avatar.png"}
            alt={teacher.user?.name}
            width={140}
            height={140}
            className="rounded-full border-4 border-slate-100"
          />

          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            {teacher.user?.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {teacher.qualification || "Qualification not set"}
          </p>
        </div>

        {/* Details */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">

          <div>
            <h3 className="font-semibold">Subjects</h3>
            <p className="mt-1">
              {teacher.subjectsChosen?.join(", ") || "Not set"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Experience</h3>
            <p className="mt-1">
              {teacher.experience || 0} years
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="mt-1">
              {teacher.location || "Not set"}
            </p>
          </div>
<div>
  <h3 className="font-semibold">Monthly Fee</h3>
  <p className="mt-1 font-bold text-green-600">
    ₹{teacher.pricePerMonth}
  </p>
</div>






          <div>
            <h3 className="font-semibold">Offline Availability</h3>
            <p className="mt-1">
              {teacher.offlineAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Ratings</h3>
            <p className="mt-1 text-yellow-600">
              ⭐ {teacher.ratings || 0}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg">About</h3>
          <p className="mt-2 text-gray-600 leading-relaxed">
            {teacher.bio || "No bio available"}
          </p>
        </div>


<div className="flex justify-between">
        <Button className="bg-red-500">
                   Click For Demo class 
                    </Button>



   <Button
  className="bg-blue-500"
  onClick={handleAssignTeacher}
//   disabled={isAssigning || hasActiveSubscription}
>
  {/* {hasActiveSubscription ? "Teacher Assigned ✅" : "Assigning Teacher 👉"} */}
  Assigning Teacher 👉
</Button>



</div>


      </div>
    </section>
  );
};

export default TeacherProfilePage;
