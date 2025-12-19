"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { GraduationCap, Lightbulb, DollarSign, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import  ProfilePictureUpload  from "@/components/ProfilePictureUpload";
import Link from "next/link";
import { toast } from "sonner";
import { useRegisterUserMutation } from "@/store/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/feature/auth/authSlice";

import { useRouter } from "next/navigation"; // ✅ import useRouter


interface TeacherFormState {
  name: string;
  email: string;
  phone: string;
  password:string;
  qualification: string;
  experience: string;
  subjects: string;
  pricePerMonth: number;
  bio: string;
}



const TeacherSignup = () => {

  const dispatch = useDispatch();
  const router = useRouter(); //  initialize router
  const [registerUser, { isLoading }] = useRegisterUserMutation();





  const [formData, setFormData] = useState<TeacherFormState>({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    password:"",
    subjects: "",
    pricePerMonth: 0,
    bio: ""
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
    fd.append("experience", formData.experience);
    fd.append("password", formData.password);
    fd.append("subjects", formData.subjects);
    fd.append("pricePerMonth", String(formData.pricePerMonth)); // ✅ fixed
    fd.append("bio",formData.bio);

    fd.append("role", "teacher");

    if (profilePicture.file) {
      fd.append("avatar", profilePicture.file);
    }

    
    try {
      const result = await registerUser(fd).unwrap();
      dispatch(setCredentials(result));

      toast.success("Teacher Registered Successfully!");
      router.push("/login"); // ✅ redirect after successful signup
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Signup failed!";
      toast.error(errorMessage);
    }
  }; // ✅ FIXED — this closes the function correctly




























  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-150 py-10">
      <div className="container mx-auto px-4">

     
        <motion.div
          className="fixed top-20 right-4 md:right-10 text-yellow-400 opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lightbulb className="w-28 h-28 md:w-32 md:h-32" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              
              <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Become a Tutor</h1>
            <p className="text-slate-600">Share your knowledge and inspire students</p>
          </div>

          {/* Registration Fund Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Alert className="mb-6 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              <AlertDescription className="text-slate-800">
                <strong>Registration Fund:</strong> ₹101 (Refundable)
                <br />
                <span className="text-sm text-slate-600">
                  This one-time refundable deposit will be returned when you complete your first 5 sessions.
                </span>
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Card */}
          <Card className="border-2 border-yellow-200 shadow-xl w-full sm:max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-yellow-50">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                Teacher Registration
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Profile Picture Upload */}
                <ProfilePictureUpload
                  userName={formData.name}
                  onImageSelect={(file, previewUrl) => setProfilePicture({ file, previewUrl })}
                  required
                />

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label htmlFor="qualification">Highest Qualification *</Label>
                    <Input
                      id="qualification"
                      name="qualification"
                      placeholder="e.g., M.Sc. Mathematics"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>

              <div className="space-y-2">
                    <Label htmlFor="pricePerMonth">pricePerMonth (₹) *</Label>
                    <Input
                      id="pricePerMonth"
                      name="pricePerMonth"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.pricePerMonth}
                      onChange={handleChange}
                      min={1}
                      required
                    />
                  </div>

                </div>
                <div>
                     <div className="space-y-2">
                    <Label htmlFor="password">Password*</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="xyze"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects You Can Teach *</Label>
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
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your teaching experience and approach..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {/* Important Info */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-slate-700">
                        <p className="font-medium mb-1">Important Information:</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li>Complete your profile to attract more students</li>
                          <li>Set your own schedule and rates</li>
                          <li>Get paid securely through our platform</li>
                        </ul>
                      </div>
                    </div>
                  </div>

               <Button
  type="submit"
  className="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 hover:from-yellow-800 hover:to-yellow-950 text-white font-semibold py-4 md:py-6 rounded-lg shadow-lg transition-all duration-300"
>
  Register as Tutor
</Button>

                </div>
              </form>

              {/* Navigate to login */}
              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700">
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


export default TeacherSignup;
