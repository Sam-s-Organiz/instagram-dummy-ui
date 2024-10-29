 
import { HttpMethod } from "@/types/HttpStatusCode";

export const uploadPostAttachment = (
  userId: number,
   file: File,
  token?: string
) => {
  const apiUrl = new URL("http://localhost:8081/api/posts/upload");
  apiUrl.searchParams.append("userId", String(userId));
//   apiUrl.searchParams.append("imageUrl", imageUrl);
  console.log("api url ",apiUrl)

  const formData = new FormData();
  formData.append("file", file);
  console.log('formData',formData)

  return fetch(apiUrl.toString(), {
    method: HttpMethod.Post,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};
