import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";

const UploadPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    axios
      .post("/api/posts", formData)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.uploadPost}>
      <h2>Upload Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPost;
