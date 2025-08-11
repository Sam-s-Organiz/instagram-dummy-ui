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

function getMimeType(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "jfif":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "heic":
      return "image/heic";
    case "avif":
      return "image/avif";
    case "tif":
    case "tiff":
      return "image/tiff";
    case "ico":
      return "image/x-icon";
    case "pnm":
      return "image/x-portable-anymap";
    case "ppm":
      return "image/x-portable-pixmap";
    case "pgm":
      return "image/x-portable-graymap";
    default:
      return "application/octet-stream"; // fallback for unknown types
  }
}

// Function to get image source
export const getImageSrc = (post: {
  imageUrl?: string | null;
  fileData?: string | null;
}): string | null => {
  const cleanImageUrl = post.imageUrl?.replace(/"/g, "").trim();

  // If there's base64 data, use that
  if (post.fileData && cleanImageUrl) {
    const mimeType = getMimeType(cleanImageUrl);
    return `data:${mimeType};base64,${post.fileData}`;
  }

  // If there's a public image URL path, resolve it fully
  if (cleanImageUrl) {
    const baseUrl = "http://localhost:8081"; // Change if your backend URL differs
    if (cleanImageUrl.startsWith("http")) {
      return cleanImageUrl;
    }
    return `${baseUrl}${cleanImageUrl}`;
  }

  return null;
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
