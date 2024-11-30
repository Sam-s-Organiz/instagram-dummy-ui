import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
 import styles from '@/styles/ProfileTabs.module.css';
import { getImageSrc } from './Util';

const ProfileTabs = ({ uploadedPosts }:any) => {
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const formatPostsForImageList = () => {
    return uploadedPosts.map((post: any) => {
      return {
        img: getImageSrc(post),  
        title: post.caption,
        cols: 1,
        rows: 1,
      };
    });
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
        {activeTab === 'posts' && (
          <ImageList sx={{ width: '100%', height: 'auto' }} variant="quilted" cols={4} rowHeight={121}>
            {formatPostsForImageList().map((item: { cols: any; rows: any; img: string | undefined; title: string | undefined; }, index: React.Key | null | undefined) => (
              <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}  
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {activeTab === 'reels' && <Box>Reels Content</Box>}
        {activeTab === 'saved' && <Box>Saved Content</Box>}
        {activeTab === 'tagged' && <Box>Tagged Content</Box>}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
