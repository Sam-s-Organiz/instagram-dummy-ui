import { useAuthToken } from "./useAuthToken";
import React from "react";

const apiBaseUrl = "http://localhost:8081/api";

const makeApiRequest = async (
  url: string,
  method: string,
  token: string | null,
  body?: any
) => {
  if (!token) {
    window.location.href = "/login";
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

  const response = await fetch(`${apiBaseUrl}${url}`, requestOptions);

  if (!response.ok) {
    const errorMessages: Record<number, string> = {
      401: "Unauthorized. Please log in.",
      404: "User not found or Post not found",
    };
    throw new Error(errorMessages[response.status] || "Request failed");
  }

  return response.status === 204 ? null : await response.json();
};

// Helper function to create API endpoints
const createApiEndpoint = (path: string) => `${apiBaseUrl}${path}`;

// API functions using the token from hook
const useApi = () => {
  const token = useAuthToken();

  const api = React.useMemo(
    () => ({
      followUser: async (targetUserId: number) =>
        makeApiRequest(`/follow/${targetUserId}`, "POST", token),

      unfollowUser: async (targetUserId: number) =>
        makeApiRequest(`/follow/${targetUserId}`, "DELETE", token),

      getFollowCounts: async (userId: number) =>
        makeApiRequest(`/follow/counts/${userId}`, "GET", token),

      likeParticularPost: async (postId: number) =>
        makeApiRequest(`/like/post/${postId}`, "PUT", token),

      getLikeStatus: async (postId: number) =>
        makeApiRequest(`/like/post/${postId}/status`, "GET", token),
    }),
    [token]
  );

  return api;
};

export { useApi };
