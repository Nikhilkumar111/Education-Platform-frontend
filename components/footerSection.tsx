"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-yellow-200 pt-14 pb-10">

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-yellow-400">TutorConnect</h2>
          <p className="text-sm text-yellow-200/80 leading-relaxed">
            Empowering students with expert tutors to achieve academic success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-yellow-200/80">
            {["Home", "Tutors", "About", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-yellow-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-yellow-200/80">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-yellow-400" />
              support@tutorconnect.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              New Delhi, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Stay Updated
          </h3>

          <div className="flex gap-2">
            <Input
              placeholder="Email address"
              className="bg-slate-800 border-yellow-500/40 text-yellow-100 placeholder:text-yellow-300"
            />
            <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Separator className="bg-yellow-800/30 mt-10 mb-6" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-yellow-300 text-sm">
          © {new Date().getFullYear()} TutorConnect. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
            <Icon
              key={index}
              className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
