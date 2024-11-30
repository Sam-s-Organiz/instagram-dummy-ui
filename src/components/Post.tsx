import React, { useEffect, useState } from "react";
import styles from "../styles/Post.module.css";
import { getImageSrc } from "./Util";
import { followUser, likeParticularPost } from "@/client/getFollowDetails";

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
  const storedToken = localStorage.getItem("jwtToken");
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
    if (isLiked) return; // Prevent duplicate likes
    setIsLiked(true); // Optimistically update
    setLikeCount((prev) => prev + 1);

    try {
      const response = await likeParticularPost(post.id, storedToken);

      if (response.status !== 200) {
        throw new Error("API failed");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setLikeCount(post.likeCount);
  }, [post.likeCount]);

  const imageSrc = getImageSrc(post);

  return (
    <div className={styles.postContainer}>
      <h2 className={styles.username}>{post.username}</h2>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={post.caption || "Post image"}
          className={styles.image}
        />
      )}
      <p className={styles.caption}>{post.caption || "No caption provided"}</p>

      <div className={styles.actions}>
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
      </div>
    </div>
  );
};

export default Post;
