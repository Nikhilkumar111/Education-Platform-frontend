"use client"

import React from "react";

interface EditProfileFormProps {
  open: boolean;
  onClose: () => void;
  currentImage: string;
  userType: string;
  profile: {
    name: string;
    email: string;
    phone: string;
    class: string;
    school: string;
    section: string;
    rollNumber: string;
    location: string;
    avatarUrl: string;
  };
  onSave: (updatedProfile: typeof profile) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  open,
  onClose,
  currentImage,
  userType,
  profile,
  onSave,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <p className="text-sm text-slate-600 mb-4">
          Here you can edit the profile details for {userType}.
        </p>
        {/* You can add actual form fields here */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onSave(profile)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
