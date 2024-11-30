export const getPostsByUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/posts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  