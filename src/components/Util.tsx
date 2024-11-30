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
