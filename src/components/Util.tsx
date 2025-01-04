export default interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  profilePicture: string;
  bio: string;
  postCount: number;
  followersCount: number;
  followingCount: number;
}

export const getMimeType = (url: string): string => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    default:
      return "image/jpeg";
  }
};

// Function to get image source
export const getImageSrc = (post: {
  imageUrl?: string | null;
  fileData?: string | null;
}): string | null => {
  const cleanImageUrl = post.imageUrl?.replace(/"/g, "").trim();

  let imageSrc = cleanImageUrl;
  let mimeType = cleanImageUrl ? getMimeType(cleanImageUrl) : "image/jpeg";

  if (post.fileData) {
    imageSrc = `data:${mimeType};base64,${post.fileData}`;
  }

  return imageSrc || null;
};

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

export const getMenuItems = (toggleSearchDrawer: () => void): MenuItem[] => [
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
