import { useEffect, useState } from "react";
import LayoutPage from "@/components/AppLayout";
import UserProfile from "./UserProfile";
import ProfileTabs from "@/components/ProfileTabs";

const ProfilePage = () => {
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [uploadedPosts, setUploadedPosts] = useState<any[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchUploadedPosts = async () => {
      console.log("userData", userData);
      const response = await fetch(
        `http://localhost:8081/api/posts/user/${userData.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUploadedPosts(data);
      } else {
        console.error("Failed to fetch uploaded posts.");
      }
    };

    fetchUploadedPosts();
  }, [userData.id]);

  return (
    <>
      <LayoutPage>
        <UserProfile userData={userData} />
        <ProfileTabs uploadedPosts={uploadedPosts} />
      </LayoutPage>
    </>
  );
};

export default ProfilePage;
