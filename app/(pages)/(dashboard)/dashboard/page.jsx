import { Stack } from "@mui/material";
import CrimeStatistic from "./components/CrimeStatisticComponent";
import CriminalReport from "./components/CriminalReportComponent";

const DashboardPage = () => {
  return (
    <Stack direction={"column"} className="max-w-[calc(100vw-350px)] ">
      <Stack direction={"row"} spacing={1.5} className="w-full">
        <CrimeStatistic />
        <CriminalReport />
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
