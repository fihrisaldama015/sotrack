"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CalendarToday from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import Image from "next/image";

const PLATFORM_ICON = {
  twitter: "/assets/icon/twitter.svg",
  tiktok: "/assets/icon/tiktok.svg",
  instagram: "/assets/icon/instagram.svg",
  facebook: "/assets/icon/facebook.svg",
};

const MostDiscusedLately = () => {
  const [platform, setPlatform] = useState("twitter");
  const [showPlatform, setShowPlatform] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs());

  const [chartStartDate, setChartStartDate] = useState(startDate);
  const [chartEndDate, setChartEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePlatformChange = (platform) => {
    setPlatform(platform);
    setShowPlatform(false);
  };

  const refreshData = (e) => {
    e.preventDefault();
    if (startDate.isAfter(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }
    if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs())) {
      alert("Date cannot be in the future");
      return;
    }
    setChartStartDate(startDate);
    setChartEndDate(endDate);
    setShowDatePicker(false);
  };
  return (
    <Box className="p-6 bg-white flex flex-col gap-6 flex-1 rounded-xl shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} gap={1}>
          <Typography className="text-xs text-grey-800">
            Overall Mentions Source
          </Typography>
          <Typography className="text-base font-semibold text-primary-800">
            Most Discused Lately
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Box className="relative">
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={0.5}
              onClick={() => setShowPlatform((prev) => !prev)}
              className="rounded-lg ring-1 ring-slate-100 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50 shadow-md"
            >
              <Image
                src={
                  platform in PLATFORM_ICON
                    ? PLATFORM_ICON[platform]
                    : "/assets/icon/news.svg"
                }
                width={16}
                height={16}
                alt="platform icon"
              />
              <Typography className="text-xs font-normal first-letter:capitalize">
                {platform}
              </Typography>
              <ExpandMore color="grey" sx={{ width: 16 }} />
            </Stack>
            <form
              className="absolute right-0 top-8 bg-slate-50 p-1 z-10 shadow-lg rounded-xl transition-all text-sm"
              style={{
                visibility: showPlatform ? "visible" : "hidden",
                opacity: showPlatform ? 1 : 0,
              }}
            >
              <Stack direction={"column"} spacing={0}>
                <Box
                  onClick={() => handlePlatformChange("twitter")}
                  className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                >
                  Twitter
                </Box>
                <Box
                  onClick={() => handlePlatformChange("tiktok")}
                  className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                >
                  Tiktok
                </Box>
                <Box
                  onClick={() => handlePlatformChange("instagram")}
                  className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                >
                  Instagram
                </Box>
                <Box
                  onClick={() => handlePlatformChange("facebook")}
                  className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                >
                  Facebook
                </Box>
                <Box
                  onClick={() => handlePlatformChange("news")}
                  className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                >
                  News
                </Box>
              </Stack>
            </form>
          </Box>
          <Box className="relative">
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="rounded-lg ring-1 ring-slate-200 hover:ring-slate-400 transition-all px-2 py-1 cursor-pointer hover:bg-slate-50"
            >
              <CalendarToday color="grey" sx={{ width: 16 }} />
              <Typography className="text-[#0f172a] text-xs font-normal">
                <span className="text-[rgba(0,0,0,0.7)] ">date: </span>{" "}
                {chartStartDate.format("DD MMM")} -{" "}
                {chartEndDate.format("DD MMM YYYY")}
              </Typography>
            </Stack>
            <form
              onSubmit={refreshData}
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="flex"
                >
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
      </Stack>
      <Stack direction={"column"} className="">
        {MOST_DISCUSSED_DATA.map((data, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            className="px-4 py-6 text-[#404040]"
            style={{ backgroundColor: index % 2 === 0 ? "#F2F2F2" : "#FFFFFF" }}
          >
            <Typography width={70} className="text-base">
              {index + 1}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              className=" w-full"
            >
              <Typography>{data.topic}</Typography>
              <Stack alignItems={"flex-end"}>
                <Typography className="text-lg font-black">
                  {data.mentions}
                </Typography>
                <Typography className="text-xs">Mentions</Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default MostDiscusedLately;

const MOST_DISCUSSED_DATA = [
  {
    topic: "Begal Suhat",
    mentions: 151,
  },
  {
    topic: "Demo Mahasiswa",
    mentions: 126,
  },
  {
    topic: "Terorisme",
    mentions: 75,
  },
  {
    topic: "Kericuhan",
    mentions: 73,
  },
  {
    topic: "Penipuan",
    mentions: 71,
  },
  {
    topic: "Pemerkosaan",
    mentions: 69,
  },
  {
    topic: "Pembunuhan",
    mentions: 68,
  },
  {
    topic: "Korupsi",
    mentions: 67,
  },
];
