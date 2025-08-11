import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./ProfilePage.module.css";
import User from "@/components/Util";
import { useApi } from "@/client/getFollowDetails";
import { useRouter } from "next/router";

interface UserProfileStatsProps {
  userDetails: User;
}

const UserProfileStats = ({ userDetails }: UserProfileStatsProps) => {
  const [userStats, setUserStats] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getFollowCounts } = useApi();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadUserStats = async () => {
      try {
        setError(null);
        const data = await getFollowCounts(userDetails.id);
        if (isMounted) {
          setUserStats(data);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
          if (error.message.includes("not authenticated")) {
            router.push("/login");
          }
        }
      }
    };

    if (userDetails.id) {
      loadUserStats();
    }

    return () => {
      isMounted = false;
    };
  }, [userDetails.id]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

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
