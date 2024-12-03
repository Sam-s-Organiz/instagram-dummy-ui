import React, { useState, ChangeEvent } from "react";
import { Box, Button, Typography, Tab, Tabs } from "@mui/material";
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
  const [caption, setCaption] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setUploadError(null);

    try {
      const response = await uploadPostAttachment(
        userId,
        selectedFile,
        undefined,
        caption,
        token
      ); // Call with file and caption

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

  const handleUrlUpload = async () => {
    if (!imageUrl) {
      setUploadError("Please enter an image URL.");
      return;
    }

    if (!caption) {
      setUploadError("Caption is required for URL uploads.");
      return;
    }

    setUploadError(null);

    try {
      const response = await uploadPostAttachment(
        userId,
        undefined,
        imageUrl,
        caption,
        token
      );

      if (!response.ok) {
        throw new Error("URL upload failed");
      }

      console.log("Image URL uploaded successfully");
      onClose();
    } catch (error) {
      setUploadError("Error uploading image URL");
      console.error("Upload error:", error);
    }
  };

  return (
    <Box className={styles.uploadArea}>
      <UploadIcon className={styles.uploadIcon} />
      <Typography className={styles.uploadText}>
        Drag photos and videos here
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Upload from Computer" />
        <Tab label="Upload from URL" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
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
            <Typography className={styles.fileErrorMsg}>
              {uploadError}
            </Typography>
          )}
          {selectedFile && (
            <>
              <Typography className={styles.uploadText}>Caption:</Typography>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter a caption"
                className={styles.urlInput}
              />
              <Button
                variant="contained"
                onClick={handleFileUpload}
                className={styles.uploadButton}
              >
                Upload {selectedFile.name}
              </Button>
            </>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Typography className={styles.uploadText}>
            Enter Image URL:
          </Typography>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={styles.urlInput}
          />
          <Typography className={styles.uploadText}>Caption:</Typography>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a caption"
            className={styles.urlInput}
          />
          {uploadError && (
            <Typography className={styles.fileErrorMsg}>
              {uploadError}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUrlUpload}
            className={styles.uploadButton}
          >
            Upload Image
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadModal;
