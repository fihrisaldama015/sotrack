"use client";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "./DatePickerComponent";
import SearchBar from "./SearchBarComponent";
import SourceTrackerTable from "./SourceTrackerTableComponent";
import TopicSelect from "./TopicSelectComponent";
import { PLATFORM_ICON } from "@/app/utils/constants";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { getSourceTrackerByDate } from "@/app/api/repository/SourceTrackerRepository";
import { getCookie } from "cookies-next";

const SourceDetailContent = ({ platformId, sourceTrackerData }) => {
  const [data, setData] = useState(sourceTrackerData);
  const [chartStartDate, setChartStartDate] = useState(dayjs().date(0));
  const [chartEndDate, setChartEndDate] = useState(dayjs());
  const [topic, setTopic] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const filteredData = data.filter((item) => {
        return item.mention.toLowerCase().includes(search.toLowerCase());
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
        <TopicSelect topic={topic} setTopic={setTopic} />
        <SearchBar />
      </Stack>
      <Stack
        direction={"column"}
        spacing={3}
        className="px-7 py-6 bg-white  bg-red-500/10 rounded-[10px]"
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Image
            src={
              platformId in PLATFORM_ICON
                ? PLATFORM_ICON[platformId]
                : "/assets/icon/news.svg"
            }
            width={16}
            height={16}
            className="object-contain"
            alt="platform icon"
          />
          <Typography className="text-base font-bold text-primary-800 first-letter:capitalize">
            {platformId} Mention Details
          </Typography>
        </Stack>
        {isLoading ? (
          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            <LoadingSpinner />
            Loading Data...
          </Stack>
        ) : (
          <SourceTrackerTable initialData={data} />
        )}
      </Stack>
    </>
  );
};

export default SourceDetailContent;
