import Head from "next/head";
import SignUp from "../dashboard";
import SignIn from "./signIn";
// import Claims from "@/components/claims/Claims";

const HomePage = () => {
  console.log("inside home");
  return (
    <>
      <Head>
        <title>Insta</title>
      </Head>
      <SignUp />
      <SignIn />
    </>
  );
};

export default HomePage;
