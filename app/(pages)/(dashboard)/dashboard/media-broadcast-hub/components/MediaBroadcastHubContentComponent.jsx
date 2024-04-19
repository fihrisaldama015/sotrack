"use client";
import { getSourceTrackerByDate } from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "./DatePickerComponent";
import MediaBroadcastHubTable from "./MediaBroadcastTableComponent";
import SearchBar from "./SearchBarComponent";

const MediaBroadcastHubContent = ({ platformId, sourceTrackerData }) => {
  const [data, setData] = useState(sourceTrackerData);
  const [chartStartDate, setChartStartDate] = useState(dayjs().date(0));
  const [chartEndDate, setChartEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const filteredData = data.filter((item) => {
        return item.message.toLowerCase().includes(search.toLowerCase());
      });
      setData(filteredData);
      setIsLoading(false);
    } else {
      setData(sourceTrackerData);
    }
  }, [search]);

  const refreshData = async (startDate, endDate) => {
    setChartStartDate(startDate);
    setChartEndDate(endDate);
    try {
      setIsLoading(true);
      const res = await getSourceTrackerByDate(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD"),
        accessToken
      );
      setData(res);
    } catch (error) {
      console.log("🚀 ~ refreshChart ~ error:", error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Stack direction={"row"} className="gap-2" flexWrap={"wrap"}>
        <DatePicker
          chartStartDate={chartStartDate}
          chartEndDate={chartEndDate}
          setChartDate={(startDate, endDate) => {
            setChartStartDate(startDate);
            setChartEndDate(endDate);
          }}
          refreshData={refreshData}
        />
        <SearchBar />
      </Stack>
      <Stack
        direction={"column"}
        spacing={3}
        className="px-7 py-6 bg-white  bg-red-500/10 rounded-[10px]"
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography className="text-base font-bold text-primary-800 first-letter:capitalize">
            Media Broadcast
          </Typography>
        </Stack>
        {isLoading ? (
          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            <LoadingSpinner />
            Loading Data...
          </Stack>
        ) : (
          <MediaBroadcastHubTable initialData={data} />
        )}
      </Stack>
    </>
  );
};

export default MediaBroadcastHubContent;
