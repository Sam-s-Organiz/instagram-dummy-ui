import React, { ChangeEvent, useState } from "react";
import { Box, Button, Chip, LinearProgress, Typography } from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
import styles from "./UploadModal.module.css"; // Custom styles

const AttachmentProgressBar = ({ label }: { label: string }) => (
  <Box className={styles.attachmentContainer}>
    <Chip label={label} />
    <LinearProgress className={styles.progressBarContainer} />
  </Box>
);

const UploadPostModal = () => {
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const createPostAttachment = async (file: File) => {
    console.log("Uploading file:", file.name);
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("upload icon clicked");
    const file = event.target.files?.item(0);
    if (!file) return;

    setUploadingFile(file);
    setUploadError(null);

    try {
      await createPostAttachment(file);
      console.log("File uploaded successfully");
    } catch (error) {
      setUploadError("Error occurred while uploading the file");
      console.error(error);
    } finally {
      setUploadingFile(null);
      event.target.value = ""; // Reset input
    }
  };

  return (
    <Box>
      <Button
        className={
          uploadingFile ? styles.uploadIconDisabled : styles.uploadIcon
        }
        disabled={!!uploadingFile}
        startIcon={<FileUploadOutlined />}
        component="label"
      >
        Upload a post
        <input
          accept="image/*,video/*"
          type="file"
          onChange={handleFileUpload}
          hidden
        />
      </Button>

      {uploadError && (
        <Typography className={styles.fileErrorMsg}>{uploadError}</Typography>
      )}

      {uploadingFile && (
        <AttachmentProgressBar label={`${uploadingFile.name}`} />
      )}
    </Box>
  );
};

export default UploadPostModal;
