"use client";
import { getMentionSourceDetail } from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeDashboardOptions } from "@/app/redux/slices/DashboardOptionsSlice";
import { PLATFORM_ICON } from "@/app/utils/constants";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "./DatePickerComponent";
import SearchBar from "./SearchBarComponent";
import SourceTrackerTable from "./SourceTrackerTableComponent";
import TopicSelect from "./TopicSelectComponent";

const SourceDetailContent = ({ platformId }) => {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { sourceTrackerStartDate, sourceTrackerEndDate } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const pageId = searchParams.get("pageId");
  const sourceType = searchParams.get("sourceType");
  const instagram_id = searchParams.get("instagram_id");
  const platform = searchParams.get("platform");
  const accessToken = getCookie("accessToken");

  const getMentionDetailData = async () => {
    try {
      const source = platform == "news" ? platformId : sourceType;
      setIsLoading(true);
      const res = await getMentionSourceDetail(
        sourceTrackerStartDate.format("YYYY-MM-DD"),
        sourceTrackerEndDate.add(1, "day").format("YYYY-MM-DD"),
        accessToken,
        pageId,
        platform,
        "All",
        source,
        instagram_id
      );
      setData(res);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ getMentionDetailData - SourceDetail ~ error:", error);
    }
  };

  useEffect(() => {
    getMentionDetailData();
  }, []);

  useEffect(() => {
    if (search) {
      const filteredData = data.filter((item) => {
        if (!item.mention) return false;
        return item.mention.toLowerCase().includes(search.toLowerCase());
      });
      setIsSearching(true);
      setFilteredData(filteredData);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  const refreshData = async (
    startDate = null,
    endDate = null,
    topic = "All"
  ) => {
    if (startDate !== null || endDate !== null) {
      dispatch(
        changeDashboardOptions({
          sourceTrackerStartDate: startDate,
          sourceTrackerEndDate: endDate,
        })
      );
    } else {
      startDate = sourceTrackerStartDate;
      endDate = sourceTrackerEndDate;
    }
    try {
      const source = platform == "news" ? platformId : sourceType;
      setIsLoading(true);
      const res = await getMentionSourceDetail(
        startDate.format("YYYY-MM-DD"),
        endDate.add(1, "day").format("YYYY-MM-DD"),
        accessToken,
        pageId,
        platform,
        topic,
        source,
        instagram_id
      );
      console.log("🚀 ~ SourceDetailContent ~ res:", res);
      setData(res);
    } catch (error) {
      console.log("🚀 ~ refreshChart - SourceDetail ~ error:", error);
    }

    setIsLoading(false);
  };
  return (
    <>
      <Stack direction={"row"} className="gap-2" flexWrap={"wrap"}>
        <DatePicker
          chartStartDate={sourceTrackerStartDate}
          chartEndDate={sourceTrackerEndDate}
          setChartDate={(startDate, endDate) => {
            setChartStartDate(startDate);
            setChartEndDate(endDate);
          }}
          refreshData={refreshData}
        />
        <TopicSelect
          topic={topic}
          setTopic={setTopic}
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
          <Image
            src={
              platform in PLATFORM_ICON
                ? PLATFORM_ICON[platform]
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
          <SourceTrackerTable
            initialData={isLoading ? [] : isSearching ? filteredData : data}
          />
        )}
      </Stack>
    </>
  );
};

export default SourceDetailContent;
