import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { cookies } from "next/headers";
import MostDiscussed from "./components/MostDiscussedComponent";
import TargetIcon from "./components/TargetIconComponent";
import Timeline from "./components/TimelineComponent";
import { getAllCategory } from "@/app/api/repository/CategoryRepository";
import { getAllPlatform } from "@/app/api/repository/PlatformRepository";

const getCategory = async (token) => {
  try {
    const res = await getAllCategory(token);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ getCategory - TimelinePage ~ error:", error);
  }
};

const getAllPlatformData = async (token) => {
  try {
    const res = getAllPlatform(token);
    return res;
  } catch (error) {
    console.log("🚀 ~ getAllPlatform - TimelinePage ~ error:", error);
  }
};

const TimelinePage = async () => {
  const token = cookies().get("accessToken")?.value || "";
  const category = await getCategory(token);
  const platform = await getAllPlatformData(token);
  return (
    <Box className="w-full flex gap-4 flex-row max-md:flex-col-reverse h-[100svh]">
      <Stack spacing={2} direction={"column"} className="flex-1">
        <Stack className=" bg-white h-fit rounded-[10px] p-5 space-y-4">
          <Stack spacing={2.5} direction={"row"}>
            <Box className="flex items-center">
              <TargetIcon />
            </Box>
            <Stack gap={0.5}>
              <Typography className="text-base font-semibold text-[#343A40]">
                Indonesia
              </Typography>
              <Typography className="text-sm text-[#868E96]">
                Kota Malang, Jawa Timur
              </Typography>
            </Stack>
          </Stack>
          <Divider className="border-none h-[3px] bg-[#ECF0F2]" />
          <Typography className="text-sm text-center font-semibold text-[#868E96]">
            No Data
          </Typography>
        </Stack>
        <Timeline category={category} platform={platform} />
      </Stack>
      <MostDiscussed />
    </Box>
  );
};

export default TimelinePage;
