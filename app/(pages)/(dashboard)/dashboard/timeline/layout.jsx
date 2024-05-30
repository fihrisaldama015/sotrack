import { DOWNLOAD } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import DownloadReport from "./components/DownloadReportComponent";

export const metadata = {
  title: "Social Media Monitoring | Timeline",
  description: "Social Media Monitoring Dashboard",
};

export default async function TimelineLayout({ children }) {
  return (
    <Box className="">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className="text-2xl font-extrabold">Dashboard</Typography>
        <DownloadReport />
      </Box>
      <Divider className="border-none h-[2px] bg-neutral-300" />
      <Box className="pt-4">{children}</Box>
    </Box>
  );
}
