import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import styles from "./ProfilePage.module.css";
import { updateProfilePicture } from "@/client/ProfilePicUpload";
import FileUploadModal from "@/components/FileUploadModal";
import DynamicModal from "@/components/CommonModal";
import User from "@/components/Util";

interface UserProfileImageProps {
  userDetails?: User | null;
}

const UserProfileImage = ({ userDetails }: UserProfileImageProps) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    userDetails?.profilePicture ?? null
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");
    setProfilePicture(
      storedProfilePicture ||
        userDetails?.profilePicture?.replace(/['"]+/g, "") ||
        null
    );
  }, [userDetails]);

  // Guard clause for missing userDetails
  if (!userDetails) {
    return (
      <Box className={styles.profileImageContainer}>
        <Face6Icon className={styles.profileImageIcon} />
      </Box>
    );
  }

  const handleProfilePictureUpload = async (
    file: File | null,
    imageUrl: string
  ) => {
    try {
      const profilePhotoUrl = file ? URL.createObjectURL(file) : imageUrl || "";

      if (!profilePhotoUrl) {
        throw new Error("No file or URL provided for profile picture upload.");
      }

      await updateProfilePicture(
        userDetails.id,
        profilePhotoUrl,
        userDetails.token
      );

      localStorage.setItem("profilePicture", profilePhotoUrl);
      setProfilePicture(profilePhotoUrl);
    } catch (error) {
      console.error("Profile picture upload failed:", error);
    }
  };

  return (
    <Box
      className={styles.profileImageContainer}
      onClick={() => setIsUploadModalOpen(true)}
      style={{ cursor: "pointer" }}
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
