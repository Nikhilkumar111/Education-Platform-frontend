"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import Image from "next/image";

interface ProfilePictureUploadProps {
  userName: string;
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
  required?: boolean;
}

export default function ProfilePictureUpload({
  userName,
  onImageSelect,
  required = false,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onImageSelect(null, null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageSelect(file, previewUrl);
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null, null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image + Modal Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Avatar
            className="h-28 w-28 cursor-pointer border"
            onClick={() => !preview && fileInputRef.current?.click()}
          >
            {preview ? (
              <AvatarImage src={preview} alt={`${userName}'s profile image`} />
            ) : (
              <AvatarFallback className="flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span className="text-xs">{required ? "Upload *" : "Upload"}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </DialogTrigger>

        {/* LARGE PREVIEW MODAL */}
        {preview && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>

            <Image
              src={preview}
              alt="Large Preview"
              width={500}
              height={500}
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

        {preview && (
          <Button variant="destructive" onClick={removeImage}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
