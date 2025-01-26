import React from "react";
    import { Plus } from "lucide-react";

    const ProfilePhotoUpload = () => {
      return (
        <div className="relative w-32 h-32 mx-auto">
          <div className="rounded-full border-2 border-quiz-primary w-full h-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
            <Plus className="h-10 w-10 text-quiz-primary" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      );
    };

    export default ProfilePhotoUpload;
