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
import { useState } from "react";
import SentigraphChart from "./SentigraphChartComponent";
import { Divider } from "@mui/material";

const SentigraphCard = ({ title, data }) => {
  const [initialData, setData] = useState(data);
  const [startDate, setStartDate] = useState(dayjs().date(0));
  const [endDate, setEndDate] = useState(dayjs());

  const refreshData = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    console.log("start", start.format("YYYY-MM-DD"));
    console.log("end", end.format("YYYY-MM-DD"));
  };

  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col w-96">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <p className="text-[#000000b2] text-base font-semibold m-0 mb-4">
          {title}
        </p>
        <DatePickerComponent
          start={startDate}
          end={endDate}
          r
          refresh={refreshData}
        />
      </Stack>

      <SentigraphChart data={data} />
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
            59%
          </Typography>
        </Stack>
        <Box className="border-none w-[1px] bg-[#F0F0F0]" />
        <Stack direction={"column"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Box className="w-2 h-2 rounded-full bg-[#1B59F8]"></Box>
            <Typography className="text-[#A3AED0] text-xs font-medium">
              Negative
            </Typography>
          </Stack>
          <Typography className="text-[#2B3674] text-lg font-extrabold">
            41%
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
    if (
      startDate.isAfter(dayjs().add(1, "day")) ||
      endDate.isAfter(dayjs().add(1, "day"))
    ) {
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
