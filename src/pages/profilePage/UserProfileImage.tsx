import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import styles from "./ProfilePage.module.css";
import { updateProfilePicture } from "@/client/ProfilePicUpload";
import FileUploadModal from "@/components/FileUploadModal";
import DynamicModal from "@/components/CommonModal";
import User from "@/components/Util";

interface UserProfileImageProps {
  userDetails: User;
}

const UserProfileImage = ({ userDetails }: UserProfileImageProps) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(userDetails.profilePicture);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
     const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    } else if (userDetails?.profilePicture) {
      setProfilePicture(userDetails.profilePicture.replace(/['"]+/g, ""));
    }
  }, [userDetails]);

  const handleProfilePictureUpdate = (newProfilePicture: string) => {
    localStorage.setItem("profilePicture", newProfilePicture);
    setProfilePicture(newProfilePicture);
  };

  const handleProfilePictureUpload = async (
    file: File | null,
    imageUrl: string
  ) => {
    try {
      let profilePhotoUrl = "";

      if (file) {
        console.log("Uploading file:", file);
        profilePhotoUrl = URL.createObjectURL(file);
      } else if (imageUrl) {
        console.log("Uploading URL:", imageUrl);
        profilePhotoUrl = imageUrl;
      }

      if (!profilePhotoUrl) {
        throw new Error("No file or URL provided for profile picture upload.");
      }

      await updateProfilePicture(
        userDetails.id,
        profilePhotoUrl,
        userDetails.token
      );

      // Update local state and storage with the new profile picture
      handleProfilePictureUpdate(profilePhotoUrl);
    } catch (error) {
      console.error("Profile picture upload failed:", error);
    }
  };

  return (
    <Box
      className={styles.profileImageContainer}
      onClick={() => setIsUploadModalOpen(true)} // Open modal on click
      style={{ cursor: "pointer" }} // Indicate clickability
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={userDetails?.username || "Profile Image"}
          className={styles.profileImage}
        />
      ) : (
        <Face6Icon className={styles.profileImageIcon} />
      )}

      {isUploadModalOpen && (
        <DynamicModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Profile Pic"
        >
          <FileUploadModal
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleProfilePictureUpload}
            showCaptionInput={false}
          />
        </DynamicModal>
      )}
    </Box>
  );
};

export default UserProfileImage;
