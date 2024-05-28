import {
  getCrimeStatisticByDate,
  getCriminalReportByType,
} from "@/app/api/repository/DashboardAnalyticsRepository";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import MentionAnalyticsCard from "./components/MentionAnalyticsCard";
import MentionStatisticsCard from "./components/MentionStatisticsCard";
import MostDiscusedLately from "./components/MostDiscusedLatelyComponent";
import SentigraphCard from "./components/SentigraphCard";
import SocialMentionTracker from "./components/SocialMentionTrackerComponent";
import { DOWNLOAD } from "@/app/utils/assets";
import Image from "next/image";
import PlatformSelect from "./components/PlatformSelectComponent";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }
  return (
    <Stack
      direction={"column"}
      spacing={1.5}
      className="max-w-[calc(100vw-350px)] "
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="pb-1"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Typography className="text-2xl font-extrabold">Dashboard</Typography>
          <PlatformSelect />
        </Stack>
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
      <Divider className="mb-1 border-none h-[2px] bg-neutral-300" />
      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <MentionStatisticsCard title={"Mentions"} />
        <Stack className="flex-col gap-3 w-96">
          <MentionAnalyticsCard />
          <SentigraphCard title={"Sentiment"} />
        </Stack>
      </Stack>

      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <CrimeStatistic initialData={[]} />
        <CriminalReport initialData={[]} />
      </Stack>

      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <MostDiscusedLately initialData={[]} />
        <SocialMentionTracker />
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
export const SocialMediaMentionsData = [
  {
    id: "Mention",
    color: "#2563EB",
    data: [
      // {
      //   x: "Jan",
      //   y: 0.1,
      // },
      // {
      //   x: "Feb",
      //   y: 0.1,
      // },
      {
        x: "Jan",
        y: 54,
      },
      {
        x: "Feb",
        y: 117,
      },
      {
        x: "Mar",
        y: 44,
      },
      {
        x: "Apr",
        y: 215,
      },
      {
        x: "Mei",
        y: 50,
      },
      {
        x: "Jun",
        y: 233,
      },
    ],
  },
];
export const NewsMentionsData = [
  {
    id: "Mention",
    color: "#2563EB",
    data: [
      {
        x: "Jan",
        y: 0.1,
      },
      {
        x: "Feb",
        y: 0.1,
      },
      // {
      //   x: "Jan",
      //   y: 5029,
      // },
      // {
      //   x: "Feb",
      //   y: 4100,
      // },
      // {
      //   x: "Mar",
      //   y: 5400,
      // },
      // {
      //   x: "Apr",
      //   y: 4200,
      // },
      // {
      //   x: "Mei",
      //   y: 5200,
      // },
      // {
      //   x: "Jun",
      //   y: 4023,
      // },
    ],
  },
];
