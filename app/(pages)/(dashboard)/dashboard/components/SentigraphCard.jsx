"use client";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SentigraphChart from "./SentigraphChartComponent";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { getSentimentAnalysisByDate } from "@/app/api/repository/DashboardAnalyticsRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const SentigraphCard = ({ title }) => {
  const [chartData, setChartData] = useState({ Negative: "0", Positive: "0" });
  const [startDate, setStartDate] = useState(dayjs().date(0));
  const [endDate, setEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);

  const { platformSelected } = useSelector((state) => state.dashboardReducer);
  const accessToken = getCookie("accessToken");

  const handleDatePickerChange = async (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setIsLoading(true);
    try {
      const sentigraphData = await getSentimentAnalysisByDate(
        startDate.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        platformSelected.toLowerCase(),
        accessToken
      );
      setChartData(sentigraphData);
    } catch (error) {
      console.log("🚀 ~ refreshChart ~ error:", error);
      setChartData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleDatePickerChange(startDate, endDate);
  }, [platformSelected]);

  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col w-96">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <p className="text-[#000000b2] text-base font-semibold m-0 mb-4">
          {title}
        </p>
        <DatePickerComponent
          start={startDate}
          end={endDate}
          refresh={handleDatePickerChange}
        />
      </Stack>
      {isLoading ? (
        <div className="w-full h-48 flex justify-center items-center">
          <LoadingSpinner />
          Loading Chart Data
        </div>
      ) : (
        <SentigraphChart
          data={[
            {
              id: "Negative",
              label: "Negative",
              value: isLoading
                ? "0"
                : chartData.Negative
                ? chartData.Negative
                : "0",
            },
            {
              id: "Positive",
              label: "Positive",
              value: isLoading
                ? "0"
                : chartData.Positive
                ? chartData.Positive
                : "0",
            },
          ]}
        />
      )}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={2}
        className="ring-1 ring-[#F0F0F0] py-3 px-14 rounded-2xl"
      >
        <Stack direction={"column"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Box className="w-2 h-2 rounded-full bg-[#1B59F8]"></Box>
            <Typography className="text-[#A3AED0] text-xs font-medium">
              Positive
            </Typography>
          </Stack>
          <Typography className="text-[#2B3674] text-lg font-extrabold">
            {isLoading ? "0" : chartData.Positive ? chartData.Positive : "0"}%
          </Typography>
        </Stack>
        <Box className="border-none w-[1px] bg-[#F0F0F0]" />
        <Stack direction={"column"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Box className="w-2 h-2 rounded-full bg-[#6AD2FF]"></Box>
            <Typography className="text-[#A3AED0] text-xs font-medium">
              Negative
            </Typography>
          </Stack>
          <Typography className="text-[#2B3674] text-lg font-extrabold">
            {isLoading ? "0" : chartData.Negative ? chartData.Negative : "0"}%
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default SentigraphCard;

const DatePickerComponent = ({ start, end, refresh }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const validate = (e) => {
    e.preventDefault();
    if (startDate.isAfter(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }
    if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs())) {
      alert("Date cannot be in the future");
      return;
    }
    refresh(startDate, endDate);
    setShowDatePicker(false);
  };

  return (
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
          <span className="text-[rgba(0,0,0,0.7)] ">date: </span>
          {start.format("DD MMM")} - {end.format("DD MMM YYYY")}
        </Typography>
        <ExpandMore
          color="grey"
          sx={{ width: 16 }}
          className={`${showDatePicker ? "rotate-180" : ""} transition-all`}
        />
      </Stack>
      <form
        onSubmit={validate}
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
  );
};
