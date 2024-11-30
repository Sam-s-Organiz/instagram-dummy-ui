import React from "react";
import Header from "./Header";  
 import styles from "../styles/LayoutPage.module.css";
import LeftPanel from "./Leftpanel";

interface LayoutProps {
  children: React.ReactNode;  
}

const LayoutPage= ({ children }:LayoutProps) => {
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
