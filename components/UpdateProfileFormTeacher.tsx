"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateTeacherProfileMutation } from "@/store/api/teacher/teacherApi";
import { toast } from "sonner";

interface UpdateProfileFormTeacherProps {
  open: boolean;
  onClose: () => void;
  profile: any;
  onSave: (updatedProfile: any) => void;
}

const UpdateProfileFormTeacher: React.FC<UpdateProfileFormTeacherProps> = ({
  open,
  onClose,
  profile,
  onSave,
}) => {
  const [updateProfile, { isLoading }] = useUpdateTeacherProfileMutation();

  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    phone: "",
    qualification: "",
    experience: "",
    location: "",
    bio: "",
    pricePerMonth: "", // ✅ ADDED
  });

  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /* ================= PRELOAD ================= */
  useEffect(() => {
    if (profile) {
      setFormData({
        phone: profile.phone ?? "",
        qualification: profile.qualification ?? "",
        experience: String(profile.experience ?? ""),
        location: profile.location ?? "",
        bio: profile.bio ?? "",
        pricePerMonth: String(profile.pricePerMonth ?? ""), // ✅ ADDED
      });

      setSubjects(profile.subjectsChosen ?? []);
    }
  }, [profile]);

  if (!open) return null;

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("phone", formData.phone);
    formPayload.append("qualification", formData.qualification);
    formPayload.append("experience", formData.experience);
    formPayload.append("location", formData.location);
    formPayload.append("bio", formData.bio);
    formPayload.append("pricePerMonth", formData.pricePerMonth); // ✅ ADDED
    formPayload.append("subjectsChosen", JSON.stringify(subjects));

    if (avatarFile) {
      formPayload.append("avatar", avatarFile);
    }

    try {
      const res: any = await updateProfile(formPayload).unwrap();

      toast.success("Profile updated successfully");

      onSave({
        phone: res.data.profile.phone,
        qualification: res.data.profile.qualification,
        experience: res.data.profile.experience,
        subjectsChosen: res.data.profile.subjectsChosen,
        location: res.data.profile.location,
        bio: res.data.profile.bio,
        pricePerMonth: res.data.profile.pricePerMonth, // ✅ ADDED
        avatarUrl:
          res.data.profile.avatar ||
          profile?.user?.avatar ||
          "/avatar.png",
      });

      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Update Teacher Profile
        </h2>

        {/* READ ONLY */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Name</label>
          <input
            value={profile?.user?.name || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm font-semibold">Email</label>
          <input
            value={profile?.user?.email || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        {/* AVATAR */}
        <div className="mb-4">
          <label className="text-sm font-semibold block mb-2">Avatar</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAvatarFile(e.target.files?.[0] || null)
              }
            />

            {(avatarFile || profile?.avatar || profile?.user?.avatar) && (
              <Image
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : profile?.avatar || profile?.user?.avatar
                }
                alt="Avatar"
                width={72}
                height={72}
                className="rounded-full border object-cover"
              />
            )}
          </div>
        </div>

        {/* EDITABLE INPUTS */}
        <div className="space-y-3">
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* ✅ PRICE PER MONTH (ADDED, UI SAME) */}
          <input
            type="number"
            name="pricePerMonth"
            placeholder="Price Per Month (₹)"
            value={formData.pricePerMonth}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* SUBJECTS */}
        <div className="mt-4">
          <label className="text-sm font-semibold block mb-2">Subjects</label>

          <div className="flex flex-wrap gap-2 mb-2">
            {subjects.map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-yellow-100 rounded-full flex items-center gap-2"
              >
                {s}
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(s)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Add subject"
              className="flex-1 p-3 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddSubject}
              className="px-4 bg-green-600 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* BUTTONS */}
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
            className="flex-1 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileFormTeacher;
