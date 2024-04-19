import {
  getCrimeStatisticByDate,
  getCriminalReportByType,
} from "@/app/api/repository/DashboardAnalyticsRepository";
import { getMostDiscusedLatelyByDate } from "@/app/api/repository/MostDiscusedRepository";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import MostDiscusedLately from "./components/MostDiscusedLatelyComponent";
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
  const startDate = dayjs().day(0);
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

const getInitialMostDiscussed = async () => {
  const startDate = dayjs().day(0);
  const endDate = dayjs();
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await getMostDiscusedLatelyByDate(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD"),
      accessToken,
      "facebook"
    );
    return res;
  } catch (error) {
    console.log("🚀 ~ refreshChart ~ error:", error);
    return [];
  }
};

const DashboardPage = async () => {
  const initialCrimeStatistic = await getInitialCrimeStatistic();
  const initialCriminalReport = await getInitialCriminalReport();
  // const initialMostDiscussed = await getInitialMostDiscussed();

  return (
    <Stack
      direction={"column"}
      spacing={1.5}
      className="max-w-[calc(100vw-350px)] "
    >
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
