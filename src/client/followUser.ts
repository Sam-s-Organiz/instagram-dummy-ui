export const followUser = async (userId: number) => {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`http://localhost:8081/api/user/follow/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
     });
  
    if (!response.ok) {
      throw new Error("Failed to follow user");
    }
  
    return await response.json();
  };
  