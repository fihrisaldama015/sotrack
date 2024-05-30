"use client";
import { getMostDiscusedLatelyByDate } from "@/app/api/repository/MostDiscusedRepository";
import { getPageList } from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeDashboardMostDiscusedLately } from "@/app/redux/slices/DashboardDataSlice";
import { changeFacebookPageList } from "@/app/redux/slices/FacebookPageSlice";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { mutate } from "swr";

const PLATFORM_ICON = {
  twitter: "/assets/icon/twitter.svg",
  tiktok: "/assets/icon/tiktok.svg",
  instagram: "/assets/icon/instagram.svg",
  facebook: "/assets/icon/facebook.svg",
};

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return "";
};

const MostDiscusedLately = ({ initialData }) => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showPlatform, setShowPlatform] = useState(false);
  const { platformSelected } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const [platform, setPlatform] = useState(platformSelected);

  const [parameter, setParameter] = useState("");
  const [showParameter, setShowParameter] = useState(false);

  const [pageList, setPageList] = useState([]);

  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [chartStartDate, setChartStartDate] = useState(startDate);
  const [chartEndDate, setChartEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const { facebookPageList } = useSelector((state) => state.facebookReducer);

  const accessToken = getCookie("accessToken");

  const handlePlatformChange = (platform) => {
    setPlatform(platform);
    setShowPlatform(false);
  };

  const getPageListData = async () => {
    try {
      const pageListResult = await getPageList();
      const pageId = checkConnectedInstagramFromFacebook(pageListResult);
      setParameter(pageId);
      setPageList(pageListResult);
      dispatch(
        changeFacebookPageList({
          facebookPageList: pageListResult,
        })
      );
    } catch (error) {
      console.log("🚀 ~ error - Get Page List:", error);
    }
  };

  const {
    data,
    error,
    isLoading: loadingCache,
  } = useSWR(
    `/api/data/platform=${platform}&since=${chartStartDate.format(
      "YYYY-MM-DD"
    )}&until=${chartEndDate.format("YYYY-MM-DD")}`,
    () =>
      getMostDiscusedLatelyByDate(
        chartStartDate.format("YYYY-MM-DD"),
        chartEndDate.format("YYYY-MM-DD"),
        accessToken,
        platform,
        parameter ? parameter : ""
      ),
    {
      refreshInterval: 0, // Disable automatic refreshing
      revalidateOnFocus: false, // Disable revalidation on window focus
      staleTime: 60000,
      revalidateOnMount: true,
      fallbackData: [],
    }
  );

  useEffect(() => {
    if (!data) return;
    if (data.length == 0) return;
    if (data.length > 0) {
      dispatch(
        changeDashboardMostDiscusedLately({
          mostDiscusedLatelyData: data,
        })
      );
    }
  }, [data]);
  useEffect(() => {
    setIsLoading(loadingCache);
  }, [loadingCache]);

  useEffect(() => {
    if (platformSelected == "Facebook" || platformSelected == "Instagram") {
      if (facebookPageList.length === 0) {
        getPageListData();
      } else {
        setPageList(facebookPageList);
        setParameter(checkConnectedInstagramFromFacebook(facebookPageList));
      }
    }
  }, []);

  useEffect(() => {
    setPlatform(platformSelected);
    if (platformSelected == "Facebook" || platformSelected == "Instagram") {
      if (facebookPageList.length === 0) {
        getPageListData();
      } else {
        setPageList(facebookPageList);
        setParameter(checkConnectedInstagramFromFacebook(facebookPageList));
      }
    }
  }, [platformSelected]);

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
    } catch (error) {
      console.log("🚀 ~ refreshData - MostDiscusedLately ~ error:", error);
    }

    setChartStartDate(startDate);
    setChartEndDate(endDate);

    setIsLoading(false);
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
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {/* <Box className="relative">
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={0.5}
              onClick={() => setShowPlatform((prev) => !prev)}
              className="rounded-lg ring-1 ring-slate-100 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50 shadow-md"
            >
              <Image
                src={
                  platform.toLowerCase() in PLATFORM_ICON
                    ? PLATFORM_ICON[platform.toLowerCase()]
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
          </Box> */}
          {platform.toLowerCase() !== "news" && (
            <Box className="relative">
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
            </Box>
          )}

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
      <Stack direction={"column"} className="h-[400px] overflow-auto">
        {!data && <LoadingSpinner />}
        {isLoading ? (
          <div className="w-full h-48 flex justify-center items-center">
            <LoadingSpinner />
            {(platform == "facebook" || platform == "instagram") &&
            pageList.length == 0
              ? "Loading Facebook Page List"
              : "Loading Most Discussed Data"}
          </div>
        ) : (
          data.length == 0 && (
            <div className="w-full h-48 flex justify-center items-center">
              {(platform == "facebook" || platform == "instagram") &&
              pageList.length == 0
                ? "No Connected Facebook Account, go to Connect Account Menu"
                : "No Data, Please select another date range or platform"}
            </div>
          )
        )}

        {data.map((data, index) => (
          <Stack
            key={index}
            display={isLoading ? "none" : "flex"}
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
