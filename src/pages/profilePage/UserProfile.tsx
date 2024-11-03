import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Button } from "@mui/material";
import styles from "./ProfilePage.module.css";
import LoadingTruck from "@/components/LoadingTruck";
import DynamicModal from "@/components/CommonModal";
import UserProfileImage from "./UserProfileImage";
import UserProfileStats from "./UserProfileStats";
import FileUploadModal from "./FileUploadModal";
import User from "@/components/Util";

interface UserProfileProps {
  userData: { [key: string]: User };
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const [userDetails, setUserDetails] = useState<any>(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserDetails(JSON.parse(storedUser));
      } catch (error) {
        console.error("Faileds to parse user data:", error);
      }
    }
  }, []);

  if (!userDetails) {
    return <LoadingTruck />;
  }

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.profileHeader}>
        <UserProfileImage userDetails={userDetails} />
        <UserProfileStats userDetails={userDetails} />
      </Box>
      <Box className={styles.newPostContainer}>
        <Button
          className={styles.newPostButton}
          onClick={() => setIsModalOpen((prevState) => !prevState)}
        >
          <span className={styles.plusIcon}>+</span> New
        </Button>
      </Box>
      <DynamicModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create new post"
      >
        <FileUploadModal
          onClose={() => setIsModalOpen(false)}
          userId={userDetails?.id}
          token={userDetails?.token}
        />
      </DynamicModal>
    </Box>
  );
};

export default UserProfile;
