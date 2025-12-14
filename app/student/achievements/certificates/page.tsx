"use client";

import React, { useEffect, useState } from "react";

// Type for certificate
interface Certificate {
  id: number;
  studentName: string;
  achievement: string;
  date: string;
  issuedBy: string;
  icon: string; // optional emoji or image
}

// ⭐ Mock certificate data
const mockCertificates: Certificate[] = [
  {
    id: 1,
    studentName: "Alice Johnson",
    achievement: "Completed the Advanced Math Course",
    date: "2025-12-11",
    issuedBy: "Springfield High School",
    icon: "🎓",
  },
  {
    id: 2,
    studentName: "Alice Johnson",
    achievement: "Top Scorer in Science Quiz",
    date: "2025-11-30",
    issuedBy: "Springfield High School",
    icon: "🏅",
  },
];

const AchieveCertificate = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    // Simulate fetching certificate data
    setTimeout(() => {
      setCertificates(mockCertificates);
    }, 400);
  }, []);

  return (
    <div className="p-15 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">🎖️ Your Certificates</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all relative"
          >
            {/* Optional Icon */}
            <div className="text-5xl absolute -top-6 right-6">{cert.icon}</div>

            <h2 className="text-xl font-semibold mb-2">{cert.achievement}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Student:</span> {cert.studentName}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Issued By:</span> {cert.issuedBy}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Date:</span> {cert.date}
            </p>

            <div className="mt-4 text-center">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Download Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <p className="text-gray-500">You have not earned any certificates yet.</p>
      )}
    </div>
  );
};

export default AchieveCertificate;
