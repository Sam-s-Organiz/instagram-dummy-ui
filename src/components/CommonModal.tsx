import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import styles from "@/styles/UploadModal.module.css";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DynamicModal = ({
  open,
  onClose,
  title,
  children,
}: DynamicModalProps) => {
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <Box className={styles.modalContent}>
        <Typography variant="h6" className={styles.modalTitle}>
          {title}
        </Typography>
        <Box className={styles.modalBody}>{children}</Box>
        <Button onClick={onClose} className={styles.closeButton}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DynamicModal;
