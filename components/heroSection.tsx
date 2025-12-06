"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  onNavigateToLogin?: () => void;
}

export function HeroSection({ onNavigateToLogin }: HeroSectionProps) {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

 

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 py-16 md:py-24 relative overflow-hidden">
      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-10 text-yellow-400 opacity-30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <GraduationCap className="w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-20 text-blue-400 opacity-30"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <BookOpen className="w-20 h-20" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4 text-yellow-500 opacity-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight"
              >
                Connect with
                <span className="text-yellow-600"> Expert Tutors</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                Bridge the gap between students seeking knowledge and passionate
                educators. Find your perfect tutor or share your expertise with
                eager learners.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/Login">
  <Button className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 flex items-center gap-2 transition-all">
    Get Started
    <ArrowRight className="w-5 h-5" />
  </Button>
</Link>

              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={scrollToAbout}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 gap-8 pt-8 border-t border-yellow-200"
            >
              {/* Tutors Stat */}
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center justify-center w-12 h-12 bg-yellow-200 rounded-full mx-auto mb-2"
                >
                  <Users className="w-6 h-6 text-slate-700" />
                </motion.div>
                <p className="text-2xl font-bold text-slate-800">500+</p>
                <p className="text-slate-600">Tutors Available</p>
              </motion.div>

              {/* Subjects Stat */}
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="flex items-center justify-center w-12 h-12 bg-yellow-200 rounded-full mx-auto mb-2"
                >
                  <BookOpen className="w-6 h-6 text-slate-700" />
                </motion.div>
                <p className="text-2xl font-bold text-slate-800">50+</p>
                <p className="text-slate-600">Subjects Covered</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <Image
                src="/Tutors-connect-image.png"
                alt="TutorConnect - Connecting students with tutors"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Background frame */}
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-full h-full bg-yellow-200 rounded-2xl opacity-50 -z-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
