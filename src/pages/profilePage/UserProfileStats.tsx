import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./ProfilePage.module.css";
import User from "@/components/Util";
import { useApi } from "@/client/getFollowDetails";
import { useRouter } from "next/router";

interface UserProfileStatsProps {
  userDetails?: User | null;
}

const UserProfileStats = ({ userDetails }: UserProfileStatsProps) => {
  const [userStats, setUserStats] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getFollowCounts } = useApi();
  const router = useRouter();

  // Early return if no user details
  if (!userDetails) {
    return <div>No user data available</div>;
  }

  useEffect(() => {
    let isMounted = true;

    const loadUserStats = async () => {
      try {
        setError(null);
        // Check if userDetails and id exist
        if (!userDetails?.id) {
          throw new Error("User ID is required");
        }
        
        const data = await getFollowCounts(userDetails.id);
        if (isMounted && data) {
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

    if (userDetails?.id) {
      loadUserStats();
    }

    return () => {
      isMounted = false;
    };
  }, [userDetails?.id, getFollowCounts, router]);

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
        <span className={styles.stat}>{userStats.postCount ?? 0} posts</span>
        <span className={styles.stat}>
          {userStats.followersCount ?? 0} followers
        </span>
        <span className={styles.stat}>
          {userStats.followingCount ?? 0} following
        </span>
      </Box>
      <Box className={styles.profileBio}>
        <p>{userDetails.bio || "No bio available"}</p>
        <p>{userDetails.username}</p>
      </Box>
    </Box>
  );
};

UserProfileStats.defaultProps = {
  userDetails: null,
};

export default UserProfileStats;