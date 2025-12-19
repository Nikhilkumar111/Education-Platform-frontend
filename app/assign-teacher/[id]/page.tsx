"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  useCreateSubscriptionMutation,
  useGetActiveSubscriptionQuery,
} from "@/store/api/subscription/subscriptionApi";

import { useGetTeacherByIdQuery } from "@/store/api/teacher/teacherApi";

const AssignTeachertoStudent = () => {
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string;

  const { user } = useSelector((state: any) => state.auth);

  const { data: teacherData } = useGetTeacherByIdQuery(teacherId);

  const { data: activeSubData } = useGetActiveSubscriptionQuery(user?._id, {
    skip: !user,
  });

  const hasActiveSubscription = Boolean(
    activeSubData?.data?.subscription
  );

  const [createSubscription, { isLoading }] =
    useCreateSubscriptionMutation();

  /* ================= FORM STATE ================= */
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState(1);
  const [mode, setMode] = useState("offline");
  const [notes, setNotes] = useState("");

  /* ================= AUTH & ROLE CHECK ================= */
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can assign teachers");
      router.push("/");
      return;
    }
  }, [user, router]);

  const teacher = teacherData?.data?.teacher;

  /* ================= AMOUNT CALCULATION ================= */
  const monthlyFee = teacher?.pricePerMonth || 0;
  const totalAmount = monthlyFee * duration;

  /* ================= ASSIGN ================= */
  const handleConfirmAssign = async () => {
    if (hasActiveSubscription) {
      toast.error("You already have an active teacher");
      return;
    }

    try {
      await createSubscription({
        teacherId,
        purpose,
        duration,
        mode,
        notes,
        amount: totalAmount, // ✅ CORRECT AMOUNT
      }).unwrap();

      toast.success("Teacher assigned successfully 🎉");
      router.push("/student/Dashboard/me");
    } catch (err: any) {
      toast.error(err?.data?.message || "Assignment failed");
    }
  };

  if (!teacher) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 p-10 bg-white shadow-2xl rounded-2xl">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Confirm Teacher Assignment
      </h1>

      {/* ================= TEACHER INFO ================= */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
        <p><strong>Name:</strong> {teacher.user?.name}</p>
        <p><strong>Subjects:</strong> {teacher.subjectsChosen?.join(", ")}</p>
        <p className="text-green-600 font-semibold">
          Monthly Fee: ₹{teacher.pricePerMonth}
        </p>
        <p className="font-bold text-blue-600">
          Total Amount ({duration} month{duration > 1 ? "s" : ""}): ₹{totalAmount}
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="space-y-5">

        {/* Purpose */}
        <div>
          <label className="text-sm font-medium">Purpose (optional)</label>
          <Input
            placeholder="e.g. Board exam preparation, Olympiad, Concept clarity"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium">Duration (months)</label>
          <Input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        {/* Mode */}
        <div>
          <label className="text-sm font-medium">Mode</label>
          <select
            className="w-full border rounded-md p-2"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            {/* <option value="online">Online</option> */}
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium">Additional Notes</label>
          <Textarea
            placeholder="Any specific requirement or message for teacher"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* ================= WARNINGS ================= */}
      {hasActiveSubscription && (
        <p className="text-red-500 mt-4 text-center">
          You already have an active subscription
        </p>
      )}

      {/* ================= ACTIONS ================= */}
      <Button
        className="w-full mt-8 bg-blue-600 text-lg"
        disabled={isLoading || hasActiveSubscription}
        onClick={handleConfirmAssign}
      >
        {isLoading ? "Processing..." : "Confirm & Pay"}
      </Button>

      <Button
        variant="outline"
        className="w-full mt-3"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </div>
  );
};

export default AssignTeachertoStudent;
