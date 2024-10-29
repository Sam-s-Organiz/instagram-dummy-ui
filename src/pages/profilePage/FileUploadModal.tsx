import React, { useState, ChangeEvent, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./ProfilePage.module.css";
import { uploadPostAttachment } from "@/client/createPostUpload";

interface FileUploadModalProps {
  userId: number;
  onClose: () => void;
  token: string;
}

const FileUploadModal = ({ userId, onClose, token }: FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
    console.log("uploaded file", file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    console.log("Selected file:", selectedFile);
    console.log("Image URL:", selectedFile.name.toString());

    setUploadError(null);

    try {
      const response = await uploadPostAttachment(userId, selectedFile, token);

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      console.log("File uploaded successfully");
      onClose();
    } catch (error) {
      setUploadError("Error uploading file");
      console.error("Upload error:", error);
    }
  };

  return (
    <Box className={styles.uploadArea}>
      <UploadIcon className={styles.uploadIcon} />
      <Typography className={styles.uploadText}>
        Drag photos and videos here
      </Typography>
      <Button
        variant="contained"
        component="label"
        className={styles.uploadButton}
      >
        Select From Computer
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          hidden
        />
      </Button>
      {uploadError && (
        <Typography className={styles.fileErrorMsg}>{uploadError}</Typography>
      )}
      {selectedFile && (
        <Button
          variant="contained"
          onClick={handleFileUpload}
          className={styles.uploadButton}
        >
          Upload {selectedFile.name}
        </Button>
      )}
    </Box>
  );
};

export default FileUploadModal;
