import { useEffect, useState } from "react";
import LayoutPage from "@/components/AppLayout";
import UserProfile from "./UserProfile";
import ProfileTabs from "@/components/ProfileTabs";

const ProfilePage = () => {
  const [userData, setUserData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      <LayoutPage>
        <UserProfile userData={userData} />
        <ProfileTabs />
      </LayoutPage>
    </>
  );
};

export default ProfilePage;
