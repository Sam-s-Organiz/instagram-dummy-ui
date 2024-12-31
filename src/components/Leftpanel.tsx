import { useState, useCallback } from "react";
import styles from "../styles/Sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItemList from "./MenuItemList";
import SearchDrawer from "./SearchDrawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

const LeftPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const toggleSearchDrawer = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleClick = (title: string) => {
    setSelectedTab(title);
  };

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

  const menuItems: MenuItem[] = [
    { title: "Home", icon: <HomeIcon />, path: "/home" },
    {
      title: "Search",
      icon: <SearchIcon />,
      path: "",
      onClick: toggleSearchDrawer,  
    },
    { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
    { title: "Reels", icon: <FavoriteIcon />, path: "/reels" },
    {
      title: "Messages",
      icon: <MessageIcon />,
      path: "/messages",
      onClick: () => console.log("Messages clicked"),
    },
    { title: "Notifications", icon: <FavoriteIcon />, path: "/notifications" },
    { title: "Create", icon: <AddBoxIcon />, path: "/create" },
    { title: "Profile", icon: <AccountCircleIcon />, path: "/profilePage" },
    { title: "Threads", icon: <FavoriteIcon />, path: "/threads" },
    { title: "More", icon: <MoreHorizIcon />, path: "/more" },
  ];

  return (
    <Box>
       <OpenDrawer open={isOpen} variant="permanent">
      <Box className={styles.drawerStyling}>
        <Box>
          <h6 className={styles.drawerHeader}>Instagram</h6>
        </Box>

        <Box className={styles.navList}>
          <nav>
      <Box className={styles.drawerStyling}>
        <MenuItemList
          menuItems={menuItems}
          selectedTab={selectedTab!}
          handleClick={handleClick}
          isOpen={isOpen}
          toggleSearchDrawer={toggleSearchDrawer}
        />
      </Box>
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
      {isOpen && (
        <SearchDrawer
          isSearchOpen={isSearchOpen}
          toggleSearchDrawer={toggleSearchDrawer}
        />
      )}
    </Box>
  );
};

export default LeftPanel;
