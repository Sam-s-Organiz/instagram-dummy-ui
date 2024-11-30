import { useAuthToken } from "./useAuthToken";

const apiBaseUrl = "http://localhost:8081/api";

const makeApiRequest = async (
  url: string,
  method: string,
  token: string | null,
  body?: any
) => {
  if (!token) {
    throw new Error("User is not authenticated. Please log in.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestOptions: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    } else if (response.status === 404) {
      throw new Error("User not found or Post not found");
    }
    throw new Error("Request failed");
  }

  return response.status === 204 ? null : await response.json();
};

export const followUser = async (followerId: number) => {
  const token = useAuthToken();
  const url = `${apiBaseUrl}/user/follow/${followerId}`;
  return await makeApiRequest(url, "POST", token);
};

export const getFollowCounts = async (userId: number, token: string) => {
  const url = `${apiBaseUrl}/user/follow/count/${userId}`;
  return await makeApiRequest(url, "GET", token);
};

export const likeParticularPost = async (postID: number, token: string) => {
  const url = `${apiBaseUrl}/like/post/${postID}`;
  const response = await makeApiRequest(url, "POST", token);
  return response;
};

export const getLikeParticularPost = async (postID: number) => {
  const token = useAuthToken();
  const url = `${apiBaseUrl}/like/post/${postID}`;
  const response = await makeApiRequest(url, "POST", token);
  return response ? response : "Post liked successfully";
};
