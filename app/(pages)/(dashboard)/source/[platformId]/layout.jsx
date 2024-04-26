import { DOWNLOAD } from "@/app/utils/assets";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export const metadata = {
  title: "Source Mention Detail",
  description: "Social Media Monitoring Dashboard",
};

export default async function SourceDetailLayout({ children }) {
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
      <Box>{children}</Box>
    </Box>
  );
}
