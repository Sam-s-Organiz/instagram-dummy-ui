import React, { useState } from 'react';
import Box from '@mui/material/Box'; // Assuming you're using Material UI's Box component
import styles from '@/styles/ProfileTabs.module.css';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Box className={styles.profileTabsContainer}>
      <Box className={styles.tabsHeader}>
        <Box
          className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('posts')}
        >
          <i className="fas fa-th"></i> POSTS
        </Box>
        <Box
          className={`${styles.tab} ${activeTab === 'reels' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('reels')}
        >
          <i className="fas fa-video"></i> REELS
        </Box>
        <Box
          className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('saved')}
        >
          <i className="fas fa-bookmark"></i> SAVED
        </Box>
        <Box
          className={`${styles.tab} ${activeTab === 'tagged' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('tagged')}
        >
          <i className="fas fa-user-tag"></i> TAGGED
        </Box>
      </Box>

      <Box className={styles.tabContent}>
        {activeTab === 'posts' && <Box>Posts Content</Box>}
        {activeTab === 'reels' && <Box>Reels Content</Box>}
        {activeTab === 'saved' && <Box>Saved Content</Box>}
        {activeTab === 'tagged' && <Box>Tagged Content</Box>}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
