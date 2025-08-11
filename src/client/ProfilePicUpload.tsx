export const updateProfilePicture = async (
    userId: number,
    profilePhotoUrl: string,
    token: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/user/profilepic?userId=${userId}&profilePhoto=${encodeURIComponent(
          profilePhotoUrl
        )}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(
          `Failed to update profile picture. Status: ${response.status}`
        );
      }
  
      console.log("Profile picture updated successfully.");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;  
    }
  };
  