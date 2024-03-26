import { Stack } from "@mui/material";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";
import { getCriminalReportByType } from "@/app/api/repository/DashboardAnalyticsRepository";
import { cookies } from "next/headers";

const getInitialCriminalReport = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await getCriminalReportByType("monthly", accessToken);
    return res;
  } catch (error) {
    console.log("🚀 ~ refreshChart ~ error:", error);
  }
};

const DashboardPage = async () => {
  const initialCriminalReport = await getInitialCriminalReport();

  return (
    <Stack direction={"column"} className="max-w-[calc(100vw-350px)] ">
      <Stack direction={"row"} spacing={1.5} className="w-full">
        <CrimeStatistic />
        <CriminalReport initialData={initialCriminalReport} />
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
