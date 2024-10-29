import React from "react";
import { AppBar, Toolbar, Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <AppBar position="sticky" className={styles.appBar}>
  <Toolbar className={styles.toolbar}>
    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
      {/* Instagram Icon */}
      <Image src="/inst.png" alt="Instagram Logo" width={30} height={30} />

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        className={styles.imageTagContainer}
      >
        {/* Instagram Logo */}
        <Image src="/inst.png" alt="Instagram Logo" width={80} height={40} />
      </Typography>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search"
        className={styles.headerSearch}
      />
    </Box>
  </Toolbar>
</AppBar>

  );
};

export default Header;
