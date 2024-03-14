import { refreshToken } from "@/app/api/repository/UserRepository";
import { SidebarComponent } from "@/app/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Social Media Monitoring",
  description: "Social Media Monitoring Dashboard",
};

export default async function RootLayout({ children }) {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    try {
      const res = await refreshToken(accessToken);
      console.log({ res });
    } catch (e) {
      console.log({ error: e });
      redirect("/login");
    }
  }
  return (
    <div className="flex bg-[#F9F9F9]">
      <SidebarComponent />
      <div className="bg-[#F9F9F9] py-6 px-8 w-full">{children}</div>
    </div>
  );
}
