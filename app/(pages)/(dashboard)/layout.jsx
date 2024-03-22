"use client";
import { refreshToken } from "@/app/api/repository/UserRepository";
import { SidebarComponent } from "@/app/components";
import { getCookie, setCookie } from "cookies-next";
// import { cookies } from "next/headers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Social Media Monitoring",
//   description: "Social Media Monitoring Dashboard",
// };

const refreshCurrentToken = async (router) => {
  try {
    const res = await refreshToken();
    setCookie("accessToken", res.data.accessToken, {
      path: "/",
      maxAge: 60 * 15,
    });
    alert("Your session has expired, please refresh the page or login again.");
    router.refresh();
  } catch (e) {
    console.log({ errorRefreshToken: e });
    router.push("/login");
  }
};

export default function RootLayout({ children }) {
  // const accessToken = cookies().get("accessToken")?.value;
  const accessToken = getCookie("accessToken");
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!accessToken) {
  //     refreshCurrentToken(router);
  //   }
  // }, [accessToken]);

  return (
    <div className="flex bg-[#F9F9F9] w-[100vw]">
      <SidebarComponent />
      <div className="bg-[#F9F9F9] py-6 px-8 w-full">{children}</div>
    </div>
  );
}
