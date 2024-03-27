import { Stack } from "@mui/material";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import {
  getCrimeStatisticByDate,
  getCriminalReportByType,
} from "@/app/api/repository/DashboardAnalyticsRepository";
import { cookies } from "next/headers";
import dayjs from "dayjs";

const getInitialCriminalReport = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await getCriminalReportByType("monthly", accessToken);
    return res;
  } catch (error) {
    console.log("🚀 ~ refreshChart ~ error:", error);
  }
};

const getInitialCrimeStatistic = async () => {
  const startDate = dayjs().day(1);
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
  }
};

const DashboardPage = async () => {
  const initialCrimeStatistic = await getInitialCrimeStatistic();
  const initialCriminalReport = await getInitialCriminalReport();

  return (
    <Stack direction={"column"} className="max-w-[calc(100vw-350px)] ">
      <Stack direction={"row"} spacing={1.5} className="w-full">
        <CrimeStatistic initialData={initialCrimeStatistic} />
        <CriminalReport initialData={initialCriminalReport} />
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
