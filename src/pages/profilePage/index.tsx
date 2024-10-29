import LayoutPage from "@/components/AppLayout";
import UserProfile from "./UserProfile";
import ProfileTabs from "@/components/ProfileTabs";

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <LayoutPage>
        <UserProfile
         />
         <ProfileTabs/>
      </LayoutPage>
    </>
  );
};

export default ProfilePage;
