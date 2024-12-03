import { HttpMethod } from "@/types/HttpStatusCode";

export const uploadPostAttachment = (
  userId: number,
  file?: File,
  imageUrl?: string,
  caption?: string,
  token?: string
) => {
  const apiUrl = `http://localhost:8081/api/posts/upload/${userId}`;

  const formData = new FormData();
  if (file) {
    formData.append("file", file, file.name);
  }
  if (caption) {
    formData.append("caption", caption);
  }

  
  const urlWithParams = imageUrl
    ? `${apiUrl}?imageUrl=${encodeURIComponent(
        imageUrl
      )}&caption=${encodeURIComponent(caption || "")}`
    : apiUrl;

  return fetch(urlWithParams, {
    method: HttpMethod.Post,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file ? formData : undefined,
  });
};
