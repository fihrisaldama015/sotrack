"use client";
import {
  getMentionSourceDetail,
  getPageList,
} from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { PLATFORM_ICON } from "@/app/utils/constants";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "./DatePickerComponent";
import SearchBar from "./SearchBarComponent";
import SourceTrackerTable from "./SourceTrackerTableComponent";
import TopicSelect from "./TopicSelectComponent";
import { useSelector } from "react-redux";

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return "";
};

const SourceDetailContent = ({ platformId }) => {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState("All");

  const [parameter, setParameter] = useState("");
  // const [showParameter, setShowParameter] = useState(false);

  // const [pageList, setPageList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [chartStartDate, setChartStartDate] = useState(dayjs().date(0));
  const [chartEndDate, setChartEndDate] = useState(dayjs());

  // const { facebookPageList } = useSelector((state) => state.facebookReducer);
  const { platformSelected } = useSelector((state) => state.dashboardReducer);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const pageId = searchParams.get("pageId");
  const sourceType = searchParams.get("sourceType");
  const instagram_id = searchParams.get("instagram_id");
  const accessToken = getCookie("accessToken");

  const getMentionDetailData = async () => {
    try {
      const source = platformSelected == "News" ? platformId : sourceType;
      console.log("🚀 ~ getMentionDetailData ~ source:", source);
      setIsLoading(true);
      const res = await getMentionSourceDetail(
        chartStartDate.format("YYYY-MM-DD"),
        chartEndDate.format("YYYY-MM-DD"),
        accessToken,
        pageId,
        platformSelected.toLowerCase(),
        "All",
        source,
        instagram_id
      );
      console.log("🚀 ~ getMentionDetailData ~ res:", res);
      setData(res);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ getMentionDetailData ~ error:", error);
      // alert("Please Connect your Social Media account in Menu to view data");
    }
  };

  // const getPageListData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const pageListResult = await getPageList();
  //     const pageId = checkConnectedInstagramFromFacebook(pageListResult);
  //     setParameter(pageId);
  //     setPageList(pageListResult);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("🚀 ~ error - Get Page List:", error);
  //   }
  // };

  useEffect(() => {
    // if (platformId === "facebook" || platformId === "instagram") {
    //   if (facebookPageList.length === 0) {
    //     getPageListData();
    //   } else {
    //     setPageList(facebookPageList);
    //     setParameter(checkConnectedInstagramFromFacebook(facebookPageList));
    //   }
    // } else {
    getMentionDetailData();
    // }
  }, []);

  // useEffect(() => {
  //   if (parameter !== "") {
  //     getMentionDetailData();
  //   }
  // }, [parameter]);

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
      setChartStartDate(startDate);
      setChartEndDate(endDate);
    }
    try {
      let currentPlatform = platformSelected.toLowerCase();
      const source = platformSelected == "News" ? platformId : sourceType;
      setIsLoading(true);
      const res = await getMentionSourceDetail(
        startDate.format("YYYY-MM-DD"),
        endDate.add(1, "day").format("YYYY-MM-DD"),
        accessToken,
        pageId,
        currentPlatform,
        topic,
        source,
        instagram_id
      );
      console.log("🚀 ~ refreshData ~ res:", res);
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
          {/* <Box
            className="relative"
            sx={{
              display:
                platformId === "facebook" || platformId === "instagram"
                  ? "block"
                  : "none",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={0.5}
              onClick={() => setShowParameter(!showParameter)}
              className="rounded-lg ring-1 ring-slate-100 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50 shadow-md"
            >
              <PersonIcon color="grey" sx={{ width: 16 }} />
              <Typography className="text-xs font-normal first-letter:capitalize">
                {parameter === ""
                  ? "Choose Page"
                  : pageList.find((page) => page.id === parameter)?.name}
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
                {pageList.length > 0 &&
                  pageList.map((page, id) => (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      spacing={2}
                      key={id}
                      onClick={() => {
                        setParameter(page.id);
                        setShowParameter(false);
                      }}
                      className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
                    >
                      <Typography> {page.name}</Typography>
                      {"instagram_business_account" in page && (
                        <Image
                          src="/assets/icon/instagram.svg"
                          width={16}
                          height={16}
                          alt="instagram"
                        />
                      )}
                    </Stack>
                  ))}
              </Stack>
            </form>
          </Box> */}
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
