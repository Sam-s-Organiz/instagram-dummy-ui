export default interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  profilePicture: string;
  bio: string;
}

// utils/imageUtils.ts
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
      return "image/jpeg"; // Default MIME type
  }
};

// Function to get image source
export const getImageSrc = (post: {
  imageUrl?: string | null;
  fileData?: string | null;
}): string | null => {
  const cleanImageUrl = post.imageUrl?.replace(/"/g, "").trim();

  // Determine image source: either `imageUrl` or Base64 `fileData`
  let imageSrc = cleanImageUrl;
  let mimeType = cleanImageUrl ? getMimeType(cleanImageUrl) : "image/jpeg"; // Default MIME type

  // If `fileData` is available, format it as a data URL
  if (post.fileData) {
    imageSrc = `data:${mimeType};base64,${post.fileData}`;
  }

  return imageSrc || null; // Return null if no image is available
};
