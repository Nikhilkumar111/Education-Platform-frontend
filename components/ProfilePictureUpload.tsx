"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface Profile {
  preview: string | null;
}

const ProfilePictureUpload = () => {
  const [profile, setProfile] = useState<Profile>({ preview: null });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfile({ preview: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setProfile({ preview: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4">

      {/* Image + Modal Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Avatar
            className="h-28 w-28 cursor-pointer border"
            onClick={() => !profile.preview && fileInputRef.current?.click()}
          >
            {profile.preview ? (
              <AvatarImage src={profile.preview} alt="profile image" />
            ) : (
              <AvatarFallback className="flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload</span>
              </AvatarFallback>
            )}
          </Avatar>
        </DialogTrigger>

        {/* Large Preview */}
        {profile.preview && (
          <DialogContent className="max-w-md">
            <Image
              src={profile.preview}
              alt="Large Preview"
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        )}
      </Dialog>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelect}
      />

      {/* Upload / Remove Buttons */}
      <div className="flex gap-2">
        <Button onClick={() => fileInputRef.current?.click()}>Choose Image</Button>
        {profile.preview && (
          <Button variant="destructive" onClick={removeImage}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
