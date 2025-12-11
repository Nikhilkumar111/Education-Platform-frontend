"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MapPin, School } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashboardProps {
  name: string
  className: string
  school: string
  location: string
  avatarUrl: string

  overallScore: number
  assignmentsCompleted: number
  totalAssignments: number
  attendance: number
}

const Dashboard: React.FC<DashboardProps> = ({
  name,
  className,
  school,
  location,
  avatarUrl,
  overallScore,
  assignmentsCompleted,
  totalAssignments,
  attendance,
}) => {
  return (
    <div className="p-12">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">

        {/* Avatar */}
        <Avatar className="w-24 h-24 border-4 border-blue-400">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            {name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{name}</h2>
          <p className="text-slate-600 mb-2">{className} • {school}</p>

          {/* Location + School */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start text-sm text-slate-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <School className="w-4 h-4 mr-1" />
              <span>{school}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6">

        {/* Overall Score */}
        <Card className="text-center shadow-md border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Overall Score</CardTitle>
            <CardDescription>Performance score</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{overallScore}%</p>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card className="text-center shadow-md border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">Assignments</CardTitle>
            <CardDescription>Completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {assignmentsCompleted} / {totalAssignments}
            </p>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="text-center shadow-md border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg">Attendance</CardTitle>
            <CardDescription>Present rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{attendance}%</p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard
