"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";




const Login = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");



  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-white to-blue-500 flex justify-center items-center px-4 py-20">
      <Card className="w-full max-w-md border-2 border-slate-200 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to TutorConnect
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Tabs */}
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 gap-3 bg-white/70 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger
                value="student"
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium"
              >
                Student
              </TabsTrigger>

              <TabsTrigger
                value="teacher"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
              >
                Teacher
              </TabsTrigger>
            </TabsList>

            {/* Student Login Form */}
            <TabsContent value="student">
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Email</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-2 top-3 text-slate-500" />
                    <Input
                      id="studentEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-8"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentPassword">Password</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-2 top-3 text-slate-500" />
                    <Input
                      id="studentPassword"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-8"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5">
                  Login as Student
                </Button>
              </form>
            </TabsContent>

            {/* Teacher Login Form */}
            <TabsContent value="teacher">
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="teacherEmail">Email</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-2 top-3 text-slate-500" />
                    <Input
                      id="teacherEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-8"
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherPassword">Password</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-2 top-3 text-slate-500" />
                    <Input
                      id="teacherPassword"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-8"
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 py-5">
                  Login as Teacher
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Signup Links */}
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-slate-600 mb-4">
              Don’t have an account?
            </p>

          <div className="grid grid-cols-2 gap-4">
  <Link href="/SignUpAsTeacher" className="w-full">
    <Button
      className="w-full border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-slate-800"
    >
      Become Tutor
    </Button>
  </Link>

  <Link href="/SignUpAsStudent" className="w-full">
    <Button
      className="w-full border-blue-300 bg-blue-50 hover:bg-blue-100 text-slate-800"
    >
      Become Student
    </Button>
  </Link>
</div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;





//forget the password option is not present for it and 
// it is compulsory that the forgot option is present 