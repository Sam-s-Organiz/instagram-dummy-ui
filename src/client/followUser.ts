export const followUser = async (userId: number) => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(`http://localhost:8081/api/follow/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to follow user");
  }

  return await response.text(); // 🔁 <-- CHANGED from .json()
};

export const unfollowUser = async (userId: number) => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(`http://localhost:8081/api/follow/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to unfollow user");
  }

  return await response.text(); // 🔁 <-- CHANGED from .json()
};
