import React from "react";
import Header from "./Header"; // Assuming you have a Header component
 import styles from "../styles/LayoutPage.module.css";
import LeftPanel from "./Leftpanel";

interface LayoutProps {
  children: React.ReactNode; // This will represent the content for each page
}

const LayoutPage: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.mainContent}>
        <LeftPanel />
        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
