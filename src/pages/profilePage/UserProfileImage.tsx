import React from "react";
import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import styles from "./ProfilePage.module.css";

interface UserProfileImageProps {
  userDetails: any;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userDetails }) => {
  const cleanImageUrl =
    userDetails?.profilePicture?.replace(/['"]+/g, "") || Face6Icon;

  return (
    <Box className={styles.profileImageContainer}>
      {cleanImageUrl ? (
        <img
          src={cleanImageUrl}
          alt={userDetails?.username || "Profile Image"}
          className={styles.profileImage}
        />
      ) : (
        <Face6Icon className={styles.profileImageIcon} />
      )}
    </Box>
  );
};

export default UserProfileImage;
