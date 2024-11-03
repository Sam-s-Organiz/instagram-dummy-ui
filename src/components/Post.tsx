import React from "react";
import styles from "../styles/Post.module.css";
import { getImageSrc } from "./Util";

interface PostProps {
  post: {
    id: number;
    username: string;
    caption: string | null;
    imageUrl?: string | null;
    fileData?: string | null;  
  };
}

const Post = ({ post }: PostProps) => {
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
    </div>
  );
};

export default Post;
