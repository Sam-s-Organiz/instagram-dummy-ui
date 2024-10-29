import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import useSWR from "swr";
import LoadingTruck from "@/components/LoadingTruck";
import { Box } from "@mui/material";
import LayoutPage from "@/components/AppLayout";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  });

const HomePage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
     const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user?.id);
      setToken(user?.token);
    }
  }, []);

  const { data: posts, error } = useSWR(
    userId && token ? `http://localhost:8081/api/posts/user/${userId}` : null,
    (url) => fetcher(url, token),
    { shouldRetryOnError: false }
  );

  if (error) {
    return (
      <LayoutPage>
        <Box className="error-message">Failed to load posts</Box>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <Box className="feed">
        {!posts ? (
          <LoadingTruck />
        ) : (
          posts.map((post: any) => <Post key={post.id} post={post} />)
        )}
      </Box>
    </LayoutPage>
  );
};

export default HomePage;
