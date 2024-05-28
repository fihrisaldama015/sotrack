"use client";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

const DatePickerComponent = ({ chartStartDate, chartEndDate, refreshData }) => {
  const [startDate, setStartDate] = useState(dayjs().date(0));
  const [endDate, setEndDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    refreshData(startDate, endDate);
    setShowDatePicker(false);
  };
  return (
    <Box className="relative w-full md:w-[50%] lg:w-1/3">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={1}
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="rounded-[20px] bg-white ring-1 ring-slate-200 hover:ring-slate-400 transition-all px-4 py-3 cursor-pointer hover:bg-slate-50"
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <CalendarToday color="grey" sx={{ width: 16 }} />
          <Typography className="text-[#0f172a] text-base font-semibold">
            <span className="text-[rgba(0,0,0,0.7)]">Date: </span>{" "}
            {chartStartDate.format("DD MMM")} -{" "}
            {chartEndDate.format("DD MMM YYYY")}
          </Typography>
        </Stack>
        <ArrowDropDown
          sx={{ width: 18 }}
          className={`${showDatePicker ? "rotate-180" : ""} transition-all`}
        />
      </Stack>
      <form
        onSubmit={validate}
        className="absolute right-0 top-16 flex flex-col items-end ring-1 ring-neutral-300 bg-white gap-4 p-6 w-96 z-10 shadow-lg rounded-xl transition-all"
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

export default DatePickerComponent;
