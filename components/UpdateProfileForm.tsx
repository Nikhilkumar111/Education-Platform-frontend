"use client";

import React, { useState } from "react";
import { useUpdateStudentProfileMutation } from "@/store/api/student/studentApi";
import Image from "next/image";

interface UpdateProfileFormProps {
  initialData: {
    name: string;
    Email: string;
    grade: string;
    location: string;
    school: string;
    subjectsChosen: string[];
    avatarUrl?: string;
  };
  onClose: () => void;
}

const defaultSubjects = ["Math", "Science", "English"];

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    grade: initialData.grade || "",
    location: initialData.location || "",
    school: initialData.school || "",
  });

  const [subjects, setSubjects] = useState<string[]>(initialData.subjectsChosen || []);
  const [newSubject, setNewSubject] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [updateProfile, { isLoading }] = useUpdateStudentProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("grade", formData.grade);
    formPayload.append("school", formData.school);
    formPayload.append("location", formData.location);
    formPayload.append("subjectsChosen", JSON.stringify(subjects));

    if (avatarFile) {
      formPayload.append("avatar", avatarFile);
    }

    try {
      await updateProfile(formPayload).unwrap();
      onClose(); // close the form
    } catch (err) {
      console.error("Update failed", err);
    }
  };
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <form
      onSubmit={handleSubmit}
      className="
        bg-white w-full max-w-md
        rounded-2xl shadow-xl
        p-5 sm:p-6
        max-h-[90vh] overflow-y-auto
      "
    >
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Update Profile
      </h2>

      {/* Name */}
      <div className="mb-3">
        <label className="text-sm font-semibold block mb-1">Name</label>
        <input
          type="text"
          value={initialData.name}
          readOnly
          className="w-full p-3 rounded-lg border bg-gray-100 text-sm"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="text-sm font-semibold block mb-1">Email</label>
        <input
          type="email"
          value={initialData.Email}
          readOnly
          className="w-full p-3 rounded-lg border bg-gray-100 text-sm"
        />
      </div>

      {/* Avatar */}
      <div className="mb-4">
        <label className="text-sm font-semibold block mb-2">Avatar</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="text-sm"
          />

          {(avatarFile || initialData.avatarUrl) && (
            <Image
              src={
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : initialData.avatarUrl!
              }
              alt="Avatar"
              width={72}
              height={72}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
            />
          )}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold block mb-1">Class</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">School</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-4">
        <label className="text-sm font-semibold block mb-2">Subjects</label>

        <div className="flex flex-wrap gap-2 mb-2">
          {subjects.map((s) => (
            <span
              key={s}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
            >
              {s}
              <button
                type="button"
                onClick={() => handleRemoveSubject(s)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddSubject}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Suggested: {defaultSubjects.join(", ")}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  </div>
);
}

export default UpdateProfileForm;