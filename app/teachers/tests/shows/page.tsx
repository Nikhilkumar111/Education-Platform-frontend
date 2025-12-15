"use client";

import React from "react";
import { useShowTestsQuery } from "@/store/api/teacher/teacherApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const ShowsAllTest = () => {
  // Fetch all tests
  const { data, isLoading, isError } = useShowTestsQuery();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold animate-pulse">
        Loading tests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-500">
        Failed to load tests.
      </div>
    );
  }

  const tests = data?.data?.tests || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Created Tests</h1>

      {tests.length === 0 ? (
        <p className="text-center text-gray-500">No tests created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test: any) => (
            <motion.div
              key={test._id}
              whileHover={{ scale: 1.03 }}
              className=""
            >
              <Card className="rounded-3xl shadow-lg border bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                  <p className="text-gray-600 mt-1">Subject: {test.subject}</p>
                  <p className="text-gray-600 mt-1">
                    Duration: {test.duration} minutes
                  </p>
                  <p className="text-gray-600 mt-1">
                    Total Marks: {test.totalMarks}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Due Date: {new Date(test.dueDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <Badge
                      className={`${
                        test.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {test.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowsAllTest;
