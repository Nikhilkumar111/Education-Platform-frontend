"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "motion/react";
import {
  BookOpen,
  Brain,
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import Link from "next/link";

import { useRegisterUserMutation } from "@/store/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/feature/auth/authSlice";

import { useRouter } from "next/navigation"; // ✅ import useRouter

interface StudentFormState {
  name: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  subjects: string;
  password: string;
  goals: string;
}

const SignupStudent = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ initialize router
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState<StudentFormState>({
    name: "",
    email: "",
    phone: "",
    grade: "",
    school: "",
    subjects: "",
    password: "",
    goals: ""
  });

  const [profilePicture, setProfilePicture] = useState<{
    file: File | null;
    previewUrl: string | null;
  }>({
    file: null,
    previewUrl: null
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("grade",formData.grade);
    fd.append("school", formData.school);
    fd.append("subjects", formData.subjects);
    fd.append("password", formData.password);
    fd.append("goals", formData.goals);

    fd.append("role", "student");

    if (profilePicture.file) {
      fd.append("avatar", profilePicture.file);
    }

    try {
      const result = await registerUser(fd).unwrap();
      dispatch(setCredentials(result));

      toast.success("Student Registered Successfully!");
      router.push("/login"); // ✅ redirect after successful signup
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Signup failed!";
      toast.error(errorMessage);
    }
  }; // ✅ FIXED — this closes the function correctly

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-13">
      <div className="container mx-auto px-4">
        <motion.div
          className="fixed top-20 right-10 text-blue-400 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="w-32 h-32" />
        </motion.div>

        <motion.div
          className="fixed bottom-20 left-10 text-purple-300 opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-40 h-40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Become a Student
            </h1>
            <p className="text-slate-600">
              Start your learning journey with expert tutors
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Alert className="mb-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-slate-800">
                <strong>Registration Fund:</strong> ₹500 (Refundable)
                <br />
                <span className="text-sm text-slate-600">
                  This deposit will be returned after your first learning
                  milestone.
                </span>
              </AlertDescription>
            </Alert>
          </motion.div>

          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Student Registration
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <ProfilePictureUpload
                  userName={formData.name}
                  onImageSelect={(file, previewUrl) =>
                    setProfilePicture({ file, previewUrl })
                  }
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Class/Grade *</Label>
                    <Input
                      id="grade"
                      name="grade"
                      placeholder="e.g., Grade 10"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School Name *</Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects You Want to Learn *</Label>
                  <Input
                    id="subjects"
                    name="subjects"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Your Learning Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="Tell us your learning goals..."
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-slate-700">
                        <p className="font-medium mb-1">What You Get:</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li>Verified expert tutors</li>
                          <li>Flexible scheduling</li>
                          <li>Track your progress</li>
                          <li>Secure payment system</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6"
                  >
                    {isLoading ? "Registering..." : "Register as Student"}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupStudent;
