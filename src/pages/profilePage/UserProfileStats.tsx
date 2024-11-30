import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./ProfilePage.module.css";
import User from "@/components/Util";
import { getFollowCounts } from "@/client/getFollowDetails";

interface UserProfileStatsProps {
  userDetails: User;
}

const UserProfileStats = ({ userDetails }: UserProfileStatsProps) => {
  const [userStats, setUserStats] = useState<User | null>(null);

  useEffect(() => {
    const loadUserStats = async () => {
      try {
        const data = await getFollowCounts(userDetails.id,userDetails.token);
        setUserStats(data);
      } catch (error) {
        console.error("Error loading user stats:", error);
      }
    };

    loadUserStats();
  }, [userDetails.id, userDetails.token]);

  console.log("userDetailsBiiiio", userStats);
  if (!userStats) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.profileInfo}>
      <Box className={styles.usernameRow}>
        <h2 className={styles.username}>{userStats.username}</h2>
        <button className={styles.profileButton}>Edit Profile</button>
        <button className={styles.profileButton}>View archive</button>
      </Box>
      <Box className={styles.profileStats}>
        <span className={styles.stat}>{userStats.postCount} posts</span>
        <span className={styles.stat}>
          {userStats.followersCount} followers
        </span>
        <span className={styles.stat}>
          {userStats.followingCount} following
        </span>
      </Box>
      <Box className={styles.profileBio}>
        <p>{userDetails.bio || "No bio available"}</p>
        <p>{userDetails.username}</p>
      </Box>
    </Box>
  );
};

export default UserProfileStats;
