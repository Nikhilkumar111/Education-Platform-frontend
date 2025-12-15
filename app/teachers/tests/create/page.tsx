"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateTestMutation } from "@/store/api/teacher/teacherApi";

const TeacherTest = () => {
  const [createTest, { isLoading }] = useCreateTestMutation();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    duration: "",
    dueDate: "",
    status: "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subject) {
      toast.error("Title and Subject are required");
      return;
    }

    try {
      await createTest({
        ...formData,
        duration: Number(formData.duration),
      }).unwrap();

      toast.success("Test created successfully!");

      setFormData({
        title: "",
        subject: "",
        duration: "",
        dueDate: "",
        status: "draft",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create test");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-200 p-16">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-3xl shadow-lg border">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Create New Test
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Test Title</Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Unit Test 1"
                  />
                </div>

                <div>
                  <Label>Subject</Label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                  />
                </div>

                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Test"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherTest;
