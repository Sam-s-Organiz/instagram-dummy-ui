import LoadingTruck from "@/components/LoadingTruck";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "./app/globals.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.push("/home");
  });

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? <LoadingTruck /> : <div>Hello, again, Insta Users!</div>;
};

export default Home;
