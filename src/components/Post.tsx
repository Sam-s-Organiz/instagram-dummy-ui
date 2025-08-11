import React, { useEffect, useState } from "react";
import styles from "../styles/Post.module.css";
import { getImageSrc } from "./Util";
import { useApi } from "@/client/getFollowDetails";
import { Box } from "@mui/material";

interface PostProps {
  post: {
    id: number;
    username: string;
    caption: string | null;
    imageUrl?: string | null;
    fileData?: string | null;
    likeCount: number;
  };
}

const Post = ({ post }: PostProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const { followUser, likeParticularPost } = useApi();

  const handleFollow = async () => {
    const action = isFollowing ? "unfollow" : "follow";
    try {
      await followUser(post.id);
      setIsFollowing(!isFollowing);
      alert(isFollowing ? "Unfollowed user" : "Followed user");
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      alert("An error occurred while trying to follow/unfollow the user.");
    }
  };

  const handleLike = async () => {
    if (isLiked) return;
    setIsLiked(true);
    setLikeCount((prev) => prev + 1);

    try {
      await likeParticularPost(post.id);
    } catch (error: any) {
      console.error("Error liking post:", error.message || error);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setLikeCount(post.likeCount);
  }, [post.likeCount]);

  const imageSrc = getImageSrc(post);

  return (
    <Box className={styles.postContainer}>
      <h2 className={styles.username}>{post.username}</h2>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={post.caption || "Post image"}
          className={styles.image}
        />
      )}
      <p className={styles.caption}>{post.caption || "No caption provided"}</p>

      <Box className={styles.actions}>
        <button
          onClick={handleFollow}
          className={isFollowing ? styles.unfollowButton : styles.followButton}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>

        <button
          onClick={handleLike}
          className={isLiked ? styles.likedButton : styles.likeButton}
        >
          {isLiked ? `Liked (${likeCount})` : `Like (${likeCount})`}
        </button>
      </Box>
    </Box>
  );
};

export default Post;
