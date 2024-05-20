"use client";
import { getCriminalReportByType } from "@/app/api/repository/DashboardAnalyticsRepository";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import CriminalReportChart from "./CriminalReportChartComponent";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useSelector } from "react-redux";

const CriminalReport = ({ initialData }) => {
  const [showParameter, setShowParameter] = useState(false);
  const [parameter, setParameter] = useState("monthly");
  const [chartData, setChartData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { platformSelected } = useSelector((state) => state.dashboardReducer);
  const accessToken = getCookie("accessToken");

  const handleParameterChange = async (type) => {
    setParameter(type);
    setShowParameter(false);
    setIsLoading(true);
    try {
      const res = await getCriminalReportByType(
        type,
        platformSelected.toLowerCase(),
        accessToken
      );
      setChartData(res);
    } catch (error) {
      console.log("🚀 ~ refreshChart ~ error:", error);
      setChartData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (initialData.length === 0) {
      handleParameterChange("monthly");
    }
  }, []);

  useEffect(() => {
    handleParameterChange("monthly");
  }, [platformSelected]);

  return (
    <Box className="bg-white rounded-xl flex flex-col flex-1 py-6 px-3 shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography className="text-[#0F172A] text-base font-bold">
          Criminal Reports
        </Typography>

        <Box className="relative">
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0.5}
            onClick={() => setShowParameter(!showParameter)}
            className="rounded-lg ring-1 ring-slate-50 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50"
          >
            <Typography className="text-xs font-normal first-letter:capitalize">
              {parameter}
            </Typography>
            <ExpandMore color="grey" sx={{ width: 16 }} />
          </Stack>
          <form
            className="absolute right-0 top-8 bg-slate-50 p-1 z-10 shadow-lg rounded-xl transition-all text-sm"
            style={{
              visibility: showParameter ? "visible" : "hidden",
              opacity: showParameter ? 1 : 0,
            }}
          >
            <Stack direction={"column"} spacing={0}>
              <Box
                onClick={() => handleParameterChange("monthly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Month
              </Box>
              <Box
                onClick={() => handleParameterChange("yearly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Year
              </Box>
              <Box
                onClick={() => handleParameterChange("weekly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Week
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>

      <Box className="px-4 relative">
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 flex items-center gap-2 w-48">
            <LoadingSpinner />
            Loading Chart Data
          </div>
        )}
        <CriminalReportChart
          data={isLoading ? [] : chartData}
          type={parameter}
        />
      </Box>
    </Box>
  );
};

export default CriminalReport;

const CRIMINAL_REPORT_DATA = [
  {
    index: "Jan",
    data: 121,
  },
  {
    index: "Feb",
    data: 101,
  },
  {
    index: "Mar",
    data: 69,
  },
  {
    index: "Apr",
    data: 49,
  },
  {
    index: "May",
    data: 98,
  },
  {
    index: "Jun",
    data: 113,
  },
  {
    index: "Jul",
    data: 172,
  },
  {
    index: "Aug",
    data: 100,
  },
  {
    index: "Sep",
    data: 280,
  },
  {
    index: "Oct",
    data: 320,
  },
  {
    index: "Nov",
    data: 360,
  },
  {
    index: "Des",
    data: 270,
  },
];
