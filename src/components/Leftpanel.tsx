import { useState, useCallback } from "react";
import styles from "../styles/Sidebar.module.css";
import MenuItemList from "./MenuItemList";
import SearchDrawer from "./SearchDrawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Drawer, ListItemButton, CSSObject, Theme, styled } from "@mui/material";
import { getMenuItems, MenuItem } from "./Util";
 
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

   const menuItems: MenuItem[] = getMenuItems(toggleSearchDrawer);

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
      {isSearchOpen && (
        <SearchDrawer
          isSearchOpen={isSearchOpen}
          toggleSearchDrawer={toggleSearchDrawer}
        />
      )}
    </Box>
  );
};

export default LeftPanel;
