import React from "react";
import { Box } from "@mui/material";
import styles from "./ProfilePage.module.css";

interface UserProfileStatsProps {
  userDetails: any;
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ userDetails }) => (
  <Box className={styles.profileInfo}>
    <Box className={styles.usernameRow}>
      <h2 className={styles.username}>{userDetails?.username}</h2>
      <button className={styles.profileButton}>Edit Profile</button>
      <button className={styles.profileButton}>View archive</button>
    </Box>
    <Box className={styles.profileStats}>
      <span className={styles.stat}>{0} posts</span>
      <span className={styles.stat}>{0} followers</span>
      <span className={styles.stat}>{0} following</span>
    </Box>
    <Box className={styles.profileBio}>
      <p>{userDetails?.bio || "No bio available"}</p>
      <p>{userDetails?.username}</p>
    </Box>
  </Box>
);

export default UserProfileStats;
