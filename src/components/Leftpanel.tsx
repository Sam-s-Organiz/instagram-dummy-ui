import { useCallback, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import {
  Box,
  CSSObject,
  Drawer,
  List,
  ListItemButton,
  styled,
  Theme,
  Tooltip,
} from "@mui/material";
import MenuCell from "./MenuCell";
 
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
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
    disabled: false,
    hidden: false,
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
    disabled: false,
    hidden: false,
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profilePage",
    disabled: false,
    hidden: false,
  },
];

const LeftPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [selectedTab, setSelectedTab] = useState<string | null>(null);
  // const [menuList, setMenuList] = useState(DEFAULT_MENU_LIST);
  const toggleDrawer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <OpenDrawer open={isOpen} variant="permanent">
      <Box className={styles.drawerStyling}>
        <Box flexGrow={1}>
          <nav>
            <List>
              {menuItems.map((menu) => {
                if (!menu.hidden) {
                  return (
                    <ListItemButton
                      sx={{
                        width: isOpen ? "90%" : "70%",
                        justifyContent: isOpen ? "flex-start" : "center",
                        background:
                          selectedTab === menu.title ? "#E0F1EE" : "none",
                        color: selectedTab === menu.title ? "#027256" : "none",
                      }}
                      className={styles.listItem}
                      key={menu.title}
                      disabled={menu.disabled}
                    >
                      <Link
                        href={menu.path}
                        passHref
                        style={{ textDecoration: "none" }}
                        onClick={() => setSelectedTab(menu.title)}
                      >
                        <Tooltip
                          title={!isOpen && menu.title}
                          placement="right"
                          disableInteractive
                          PopperProps={{
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -20],
                                },
                              },
                            ],
                          }}
                        >
                          <ListItemButton>
                            <MenuCell
                              icon={menu.icon}
                              titleText={menu.title}
                              isOpen={isOpen}
                            />
                          </ListItemButton>
                        </Tooltip>
                      </Link>
                    </ListItemButton>
                  );
                }
              })}
            </List>
          </nav>
        </Box>
        <Box
          sx={{
            justifyContent: isOpen ? "flex-start" : "center",
            width: isOpen ? "90%" : "60%",
          }}
          className={styles.minimizeButton}
        >
          <MenuCell
            icon={
              isOpen ? (
                <ChevronLeftIcon className={styles.iconStyling} />
              ) : (
                <ChevronRightIcon className={styles.iconStyling} />
              )
            }
            titleText="Minimize"
            isOpen={isOpen}
            handleClick={toggleDrawer}
            onIconClick={toggleDrawer}
          />
        </Box>
      </Box>
    </OpenDrawer>
  );
};

export default LeftPanel;
