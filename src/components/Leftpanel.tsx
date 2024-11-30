import { useState, useCallback } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "../styles/Sidebar.module.css";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Tooltip,
  CSSObject,
  Theme,
  styled,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: theme.spacing(7),
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(9),
  },
});

const OpenDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItems = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "Search", icon: <SearchIcon />, path: "/search" },
  { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
  { title: "Reels", icon: <FavoriteIcon />, path: "/reels" },
  { title: "Messages", icon: <MessageIcon />, path: "/messages", badge: 2 },
  { title: "Notifications", icon: <FavoriteIcon />, path: "/notifications" },
  { title: "Create", icon: <AddBoxIcon />, path: "/create" },
  { title: "Profile", icon: <AccountCircleIcon />, path: "profilePage" },
  { title: "Threads", icon: <FavoriteIcon />, path: "/threads" },
  { title: "More", icon: <MoreHorizIcon />, path: "/more" },
];

const LeftPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const toggleDrawer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClick = (title: string) => {
    setSelectedTab(title);
  };

  return (
    <OpenDrawer open={isOpen} variant="permanent">
      <Box className={styles.drawerStyling}>
        <Box>
          <h6 className={styles.drawerHeader}>Instagram</h6>
        </Box>

        <Box className={styles.navList}>
          <nav>
            <List>
              {menuItems.map((menu) => (
                <ListItemButton
                  key={menu.title}
                  className={
                    selectedTab === menu.title
                      ? `${styles.listItemButton} ${styles.selectedTab}`
                      : isOpen
                      ? styles.listItemButton
                      : styles.listItemButtonClosed
                  }
                  onClick={() => handleClick(menu.title)}
                >
                  <Link
                    href={menu.path}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Tooltip title={!isOpen && menu.title} placement="right">
                      <div className={styles.listItemText}>
                        <span>{menu.icon}</span>
                        {isOpen && (
                          <span className={styles.title}>{menu.title}</span>
                        )}
                      </div>
                    </Tooltip>
                  </Link>
                </ListItemButton>
              ))}
            </List>
          </nav>
        </Box>

        <Box
          className={
            isOpen
              ? `${styles.toggleButton}`
              : `${styles.toggleButton} ${styles.toggleButtonClosed}`
          }
        >
          <ListItemButton onClick={toggleDrawer}>
            {isOpen ? (
              <ChevronLeftIcon className={styles.iconSize} />
            ) : (
              <ChevronRightIcon className={styles.iconSize} />
            )}
          </ListItemButton>
        </Box>
      </Box>
    </OpenDrawer>
  );
};

export default LeftPanel;
