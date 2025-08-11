import { Box, List, ListItemButton, Tooltip } from "@mui/material";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface MenuItemListProps {
  menuItems: MenuItem[];
  selectedTab: string;
  handleClick: (title: string) => void;
  isOpen: boolean;
  toggleSearchDrawer: () => void;
}

const MenuItemList = ({
  menuItems,
  selectedTab,
  handleClick,
  isOpen,
}: MenuItemListProps) => {
  return (
    <List>
      {menuItems.map((menu) => (
        <ListItemButton
          key={menu.title}
          className={
            selectedTab === menu.title
              ? `${styles.listItemButton} ${styles.selectedTab}`
              : styles.listItemButton
          }
          onClick={() => {
            handleClick(menu.title);
            if (menu.onClick) menu.onClick();
          }}
        >
          <Link href={menu.path} passHref style={{ textDecoration: "none" }}>
            <Tooltip title={!isOpen && menu.title} placement="right">
              <Box className={styles.listItemText}>
                <span>{menu.icon}</span>
                {isOpen && <span className={styles.title}>{menu.title}</span>}
              </Box>
            </Tooltip>
          </Link>
        </ListItemButton>
      ))}
    </List>
  );
};

export default MenuItemList;
