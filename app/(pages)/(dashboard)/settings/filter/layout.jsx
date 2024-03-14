import { DOWNLOAD } from "@/app/utils/assets";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import SocialMediaTabsComponent from "./components/SocialMediaTabsComponent";
import { getAllPlatform } from "@/app/api/repository/PlatformRepository";
import { cookies } from "next/headers";

export const metadata = {
  title: "Social Media Monitoring",
  description: "Social Media Monitoring Dashboard",
};

export default async function SettingLayout({ children }) {
  const token = cookies().get("accessToken")?.value;
  const allPlatform = await getAllPlatform(token);
  return (
    <Box className="space-y-4">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className="text-2xl font-extrabold">Dashboard</Typography>
        <Box
          display={"flex"}
          className="gap-2 hover:bg-slate-200 p-2 pr-3 rounded-lg cursor-pointer transition-all"
        >
          <Image src={DOWNLOAD} alt="Download Logo" width={22} height={23} />
          <Typography className="text-sm text-[#4D4D4D] font-medium">
            Download Report
          </Typography>
        </Box>
      </Box>
      <Divider className="border-none h-[2px] bg-neutral-300" />
      <Box className="p-6 bg-white rounded-lg">
        <Box
          display="flex"
          marginBottom={"40px"}
          borderBottom={"1px solid #868E96"}
          className="w-fit"
        >
          {allPlatform && <SocialMediaTabsComponent platform={allPlatform} />}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
