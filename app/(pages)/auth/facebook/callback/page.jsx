"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const facebook_user_id = searchParams.get("facebook_user_id");
  console.log("🚀 ~ page ~ facebook_user_id:", facebook_user_id);
  const router = useRouter();
  useEffect(() => {
    setCookie("facebook_user_id", facebook_user_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    router.push("/dashboard");
  }, []);
  return (
    <div className="flex w-full h-[100svh] flex-col justify-center items-center">
      <LoadingSpinner />
      Redirecting...
    </div>
  );
};

export default page;
