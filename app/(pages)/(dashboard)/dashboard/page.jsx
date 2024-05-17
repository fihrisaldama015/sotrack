import {
  getCrimeStatisticByDate,
  getCriminalReportByType,
} from "@/app/api/repository/DashboardAnalyticsRepository";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import MentionAnalyticsCard from "./components/MentionAnalyticsCard";
import MentionStatisticsCard from "./components/MentionStatisticsCard";
import MostDiscusedLately from "./components/MostDiscusedLatelyComponent";
import SentigraphCard from "./components/SentigraphCard";
import SocialMentionTracker from "./components/SocialMentionTrackerComponent";

const getInitialCriminalReport = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await getCriminalReportByType("monthly", accessToken);
    return res;
  } catch (error) {
    console.log("🚀 ~ refreshChart ~ error:", error);
    return [];
  }
};

const getInitialCrimeStatistic = async () => {
  const startDate = dayjs().subtract(1, "month").endOf("month");
  const endDate = dayjs();
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await getCrimeStatisticByDate(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD"),
      accessToken
    );
    return res;
  } catch (error) {
    console.log("🚀 ~ refreshChart ~ error:", error);
    return [];
  }
};

// const getInitialMostDiscussed = async () => {
//   const startDate = dayjs().day(0);
//   const endDate = dayjs();
//   const accessToken = cookies().get("accessToken")?.value;
//   try {
//     const res = await getMostDiscusedLatelyByDate(
//       startDate.format("YYYY-MM-DD"),
//       endDate.format("YYYY-MM-DD"),
//       accessToken,
//       "facebook"
//     );
//     return res;
//   } catch (error) {
//     console.log("🚀 ~ refreshChart ~ error:", error);
//     return [];
//   }
// };

// const getInitialPageList = async () => {
//   try {
//     const res = await getPageList();
//     return res;
//   } catch (error) {
//     console.log("🚀 ~ getInitialPageList ~ error:", error.message);
//   }
// };

const DashboardPage = async () => {
  const initialCrimeStatistic = await getInitialCrimeStatistic();
  const initialCriminalReport = await getInitialCriminalReport();
  // const initialMostDiscussed = await getInitialMostDiscussed();
  // const initialPageList = await getInitialPageList();
  return (
    <Stack
      direction={"column"}
      spacing={1.5}
      className="max-w-[calc(100vw-350px)] "
    >
      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <MentionAnalyticsCard
          title={"Social Media Mentions"}
          data={SocialMediaMentionsData}
        />
        <MentionAnalyticsCard title={"News Mentions"} data={NewsMentionsData} />
        {/* <MentionAnalyticsCard
          title={"Social Media Mentions Comment"}
          data={SocialMediaMentionsCommentData}
        /> */}
      </Stack>
      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <MentionStatisticsCard
          title={"Mentions"}
          data={SocialMediaMentionsData}
        />
        <SentigraphCard title={"Sentiment"} data={SocialMediaMentionsData} />
      </Stack>
      <Stack className="lg:flex-row flex-col gap-3 w-full">
        <CrimeStatistic initialData={initialCrimeStatistic} />
        <CriminalReport initialData={initialCriminalReport} />
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
      //   y: 54,
      // },
      // {
      //   x: "Feb",
      //   y: 117,
      // },
      // {
      //   x: "Mar",
      //   y: 44,
      // },
      // {
      //   x: "Apr",
      //   y: 215,
      // },
      // {
      //   x: "Mei",
      //   y: 50,
      // },
      // {
      //   x: "Jun",
      //   y: 233,
      // },
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
export const SocialMediaMentionsCommentData = [
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
      //   y: 850,
      // },
      // {
      //   x: "Feb",
      //   y: 770,
      // },
      // {
      //   x: "Mar",
      //   y: 900,
      // },
      // {
      //   x: "Apr",
      //   y: 600,
      // },
      // {
      //   x: "Mei",
      //   y: 1200,
      // },
      // {
      //   x: "Jun",
      //   y: 1021,
      // },
    ],
  },
];
