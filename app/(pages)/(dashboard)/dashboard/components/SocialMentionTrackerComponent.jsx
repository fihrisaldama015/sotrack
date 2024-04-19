"use client";
import { getMentionSource } from "@/app/api/repository/SourceTrackerRepository";
import { PLATFORM_ICON } from "@/app/utils/constants";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const SocialMentionTracker = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  const [chartStartDate, setChartStartDate] = useState(startDate);
  const [chartEndDate, setChartEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getMentionSource(
          chartStartDate.format("YYYY-MM-DD"),
          chartEndDate.format("YYYY-MM-DD"),
          accessToken
        );
        console.log("🚀 ~ res:", res);
        setData(res);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
      setIsLoading(false);
    })();
  }, []);

  const refreshData = async () => {
    if (startDate.isAfter(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }
    if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs().add(1, "day"))) {
      alert("Date cannot be in the future");
      return;
    }
    setShowDatePicker(false);
    try {
      setIsLoading(true);
      const res = await getMentionSource(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD"),
        accessToken
      );
      setData(res);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }

    setChartStartDate(startDate);
    setChartEndDate(endDate);

    setIsLoading(false);
  };
  return (
    <Box className="p-6 bg-white flex flex-col gap-6 lg:max-w-[400px] rounded-xl shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} gap={1}>
          <Typography className="text-xs text-grey-800">
            Overall Mentions Source
          </Typography>
          <Typography className="text-base font-semibold text-primary-800">
            Mention Source Tracker
          </Typography>
        </Stack>
        {/* <Box className="relative">
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
        </Box> */}
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
            onSubmit={(e) => {
              e.preventDefault();
              refreshData();
            }}
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
      {isLoading && (
        <div className="w-full h-48 flex justify-center items-center">
          <LoadingSpinner />
          Loading
        </div>
      )}
      <Table sx={{ display: isLoading ? "none" : "" }}>
        <TableHead>
          <TableRow>
            <TableCell className="text-xs text-[#636669] font-medium">
              Source
            </TableCell>
            <TableCell className="text-xs text-[#636669] font-medium">
              Mentions
            </TableCell>
            <TableCell className="text-xs text-[#636669] font-medium">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, id) => (
            <TableRow key={id}>
              <TableCell className="text-xs text-[#64748B]">
                <Stack direction={"row"} gap={1}>
                  <Image
                    src={
                      data.source in PLATFORM_ICON
                        ? PLATFORM_ICON[data.source]
                        : "/assets/icon/news.svg"
                    }
                    width={16}
                    height={16}
                    alt="twitter"
                  />
                  {data.source}
                </Stack>
              </TableCell>
              <TableCell className="text-xs text[#64748b]">
                {data.mentions}
              </TableCell>
              <TableCell>
                <Link
                  href={`/source/${data.slug}`}
                  className="no-underline text-xs"
                >
                  See Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SocialMentionTracker;

const SOCIAL_MENTION_DATA = [
  {
    source: "Tiktok",
    mentions: 901,
    slug: "tiktok",
    icon: "/assets/icon/tiktok.svg",
  },
  {
    source: "Instagram",
    mentions: 810,
    slug: "instagram",
    icon: "/assets/icon/instagram.svg",
  },
  {
    source: "Facebook",
    mentions: 721,
    slug: "facebook",
    icon: "/assets/icon/facebook.svg",
  },
  {
    source: "Twitter",
    mentions: 612,
    slug: "twitter",
    icon: "/assets/icon/twitter.svg",
  },
  {
    source: "Detik.com",
    mentions: 512,
    slug: "detik",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Kompas.com",
    mentions: 412,
    slug: "kompas",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "CNN Indonesia",
    mentions: 312,
    slug: "cnn",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Liputan6.com",
    mentions: 212,
    slug: "liputan6",
    icon: "/assets/icon/news.svg",
  },
  {
    source: "Metro TV",
    mentions: 112,
    slug: "metro",
    icon: "/assets/icon/news.svg",
  },
];
