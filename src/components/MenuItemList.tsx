import { List, ListItemButton, Tooltip } from "@mui/material";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "../styles/Sidebar.module.css";
// Interface for MenuItem object structure
interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
}

// Interface for the props that MenuItemList will receive
interface MenuItemListProps {
  menuItems: MenuItem[]; // List of menu items
  selectedTab: string; // The selected tab (highlighted)
  handleClick: (title: string) => void; // Function to handle tab click
  isOpen: boolean; // Whether the sidebar is open or closed
  toggleSearchDrawer: () => void; // Function to toggle the search drawer
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
            if (menu.onClick) menu.onClick(); // If onClick exists, call it
          }}
        >
          <Link href={menu.path} passHref style={{ textDecoration: "none" }}>
            <Tooltip title={!isOpen && menu.title} placement="right">
              <div className={styles.listItemText}>
                <span>{menu.icon}</span>
                {isOpen && <span className={styles.title}>{menu.title}</span>}
              </div>
            </Tooltip>
          </Link>
        </ListItemButton>
      ))}
    </List>
  );
};

export default MenuItemList;
