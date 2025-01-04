import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.header}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className={styles.imageTagContainer}
          >
            <Image
              src="/inst.png"
              alt="Instagram Logo"
              width={80}
              height={40}
              style={{ paddingLeft: "30px" }}
            />
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
