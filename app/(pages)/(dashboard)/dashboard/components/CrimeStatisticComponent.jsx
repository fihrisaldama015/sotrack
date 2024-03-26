"use client";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { getCrimeStatisticByDate } from "@/app/api/repository/DashboardAnalyticsRepository";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useState } from "react";
import TypeOfCrimeChart from "./TypeOfCrimeChartComponent";

const CrimeStatistic = () => {
  const [chartData, setChartData] = useState(CRIME_DATA);
  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs());

  const [chartStartDate, setChartStartDate] = useState(startDate);
  const [chartEndDate, setChartEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = getCookie("accessToken");

  const refreshChart = async (e) => {
    e.preventDefault();
    setChartStartDate(startDate);
    setChartEndDate(endDate);
    setShowDatePicker(false);
    try {
      setIsLoading(true);
      const res = await getCrimeStatisticByDate(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD"),
        accessToken
      );

      setChartData(res);
    } catch (error) {
      console.log("🚀 ~ refreshChart ~ error:", error);
    }
    setIsLoading(false);
  };

  return (
    <Box className="bg-white flex flex-col flex-1 rounded-xl py-6 px-3 shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <Typography className="text-[#0F172A] text-base font-bold">
            Types of Crime
          </Typography>
          <ErrorOutline color="grey" sx={{ width: 12 }} />
        </Stack>
        <Box className="relative">
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="rounded-lg ring-1 ring-slate-200 hover:ring-slate-400 transition-all px-2 cursor-pointer hover:bg-slate-50"
          >
            <CalendarToday color="grey" sx={{ width: 16 }} />
            <Typography className="text-[#0f172a] text-xs font-normal">
              <span className="text-[rgba(0,0,0,0.7)] ">date: </span>{" "}
              {chartStartDate.format("DD MMM")} -{" "}
              {chartEndDate.format("DD MMM YYYY")}
            </Typography>
          </Stack>
          <form
            onSubmit={refreshChart}
            className="absolute right-0 top-8 flex flex-col items-end gap-4 bg-slate-50 p-6 w-96 z-10 shadow-lg rounded-xl transition-all"
            style={{
              visibility: showDatePicker ? "visible" : "hidden",
              opacity: showDatePicker ? 1 : 0,
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </LocalizationProvider>
              <div>-</div>
              <LocalizationProvider dateAdapter={AdapterDayjs} className="flex">
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              className="w-fit rounded-lg"
            >
              Apply Filter
            </Button>
          </form>
        </Box>
      </Stack>

      <TypeOfCrimeChart data={isLoading ? [] : chartData} />
    </Box>
  );
};

export default CrimeStatistic;

const CRIME_DATA = [
  {
    type_of_crime: "Stealing",
    "jumlah laporan": 184,
    data: 121,
  },
  {
    type_of_crime: "Murder",
    "jumlah laporan": 24,
    data: 101,
  },
  {
    type_of_crime: "ITE",
    "jumlah laporan": 51,
    data: 69,
  },
  {
    type_of_crime: "Kidnapping",
    "jumlah laporan": 160,
    data: 49,
  },
  {
    type_of_crime: "Drugs",
    "jumlah laporan": 101,
    data: 98,
  },
  {
    type_of_crime: "Curanmor",
    "jumlah laporan": 130,
    data: 113,
  },
  {
    type_of_crime: "Pencurian",
    "jumlah laporan": 76,
    data: 172,
  },
];
