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
}

const Dashboard: React.FC<DashboardProps> = ({ name, className, school, location, avatarUrl }) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <Avatar className="w-24 h-24 border-4 border-blue-400">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{name}</h2>
          <p className="text-slate-600 mb-2">{className} • {school}</p>
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

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>


      </div>
    </div>
  )
}

export default Dashboard
