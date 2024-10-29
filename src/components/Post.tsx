import React from "react";
import styles from "../styles/Post.module.css";

interface PostProps {
  post: {
    id: number;
    username: string;
    caption: string | null;
    imageUrl?: string | null;
    fileData?: string | null; // Base64-encoded file data
  };
}

// Helper function to get MIME type from file extension
const getMimeType = (url: string): string => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    default:
      return "image/jpeg"; // Default MIME type
  }
};

const Post = ({ post }: PostProps) => {
  const cleanImageUrl = post.imageUrl?.replace(/"/g, "").trim();

  // Determine image source: either `imageUrl` or Base64 `fileData`
  let imageSrc = cleanImageUrl;
  let mimeType = cleanImageUrl ? getMimeType(cleanImageUrl) : "image/jpeg"; // Default MIME type

  // If `fileData` is available, format it as a data URL
  if (post.fileData) {
    imageSrc = `data:${mimeType};base64,${post.fileData}`;
  }

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
    </div>
  );
};

export default Post;
