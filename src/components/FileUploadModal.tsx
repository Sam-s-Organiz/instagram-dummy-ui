import React, { useState, ChangeEvent } from "react";
import { Box, Button, Typography, Tab, Tabs } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "@/styles/FileUploadModal.module.css";

interface FileUploadModalProps {
  title?: string;
  onClose: () => void;
  onUpload: (
    file: File | null,
    imageUrl: string,
    caption?: string
  ) => Promise<void>;
  token?: string;
  showCaptionInput?: boolean;
}

const FileUploadModal = ({
  title = "Upload File",
  onClose,
  onUpload,
  showCaptionInput = true,
}: FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl("");
    }
  };

  const handleUpload = async () => {
    try {
      await onUpload(
        selectedFile,
        imageUrl,
        showCaptionInput ? caption : undefined
      );
      setUploadError(null);
      onClose();
    } catch (error) {
      setUploadError("Error during upload. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <Box className={styles.modalContainer}>
      <UploadIcon className={styles.uploadIcon} />
      <Typography variant="h5" className={styles.title}>
        {title}
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
          {selectedFile && (
            <Typography className={styles.uploadText}>
              Selected File: {selectedFile.name}
            </Typography>
          )}
          {showCaptionInput && (
            <>
              <Typography className={styles.uploadText}>Caption:</Typography>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter a caption"
                className={styles.inputField}
              />
            </>
          )}
          {uploadError && (
            <Typography className={styles.errorMsg}>{uploadError}</Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
            className={styles.uploadButton}
          >
            Upload
          </Button>
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
            placeholder="https://example.com/image.jpg"
            className={styles.inputField}
          />
          {showCaptionInput && (
            <>
              <Typography className={styles.uploadText}>Caption:</Typography>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter a caption"
                className={styles.inputField}
              />
            </>
          )}
          {uploadError && (
            <Typography className={styles.errorMsg}>{uploadError}</Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!imageUrl}
            className={styles.uploadButton}
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadModal;
