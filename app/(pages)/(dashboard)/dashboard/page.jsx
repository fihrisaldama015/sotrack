import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import DownloadReportComponent from "./components/DownloadReportComponent";
import MentionAnalyticsCard from "./components/MentionAnalyticsCard";
import MentionStatisticsCard from "./components/MentionStatisticsCard";
import MostDiscusedLately from "./components/MostDiscusedLatelyComponent";
import PlatformSelect from "./components/PlatformSelectComponent";
import SentigraphCard from "./components/SentigraphCard";
import SocialMentionTracker from "./components/SocialMentionTrackerComponent";
import { cookies } from "next/headers";

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
        <DownloadReportComponent />
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
        <CrimeStatistic />
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
