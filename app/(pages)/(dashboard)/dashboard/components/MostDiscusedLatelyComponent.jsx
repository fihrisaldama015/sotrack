"use client";
import { getMostDiscusedLatelyByDate } from "@/app/api/repository/MostDiscusedRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeDashboardMostDiscusedLately } from "@/app/redux/slices/DashboardDataSlice";
import { changeDashboardMostDiscusedLatelyOptions } from "@/app/redux/slices/DashboardOptionsSlice";
import CalendarToday from "@mui/icons-material/CalendarToday";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

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

const MostDiscusedLately = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const {
    platformSelected,
    mostDiscusedLatelyStartDate,
    mostDiscusedLatelyEndDate,
  } = useSelector((state) => state.dashboardOptionsReducer);
  const accessToken = getCookie("accessToken");
  const [startDate, setStartDate] = useState(mostDiscusedLatelyStartDate);
  const [endDate, setEndDate] = useState(mostDiscusedLatelyEndDate);

  const {
    data,
    error,
    isLoading: loadingCache,
  } = useSWR(
    `/api/data/platform=${platformSelected}&since=${mostDiscusedLatelyStartDate.format(
      "YYYY-MM-DD"
    )}&until=${mostDiscusedLatelyEndDate.add(1, "day").format("YYYY-MM-DD")}`,
    () =>
      getMostDiscusedLatelyByDate(
        mostDiscusedLatelyStartDate.format("YYYY-MM-DD"),
        mostDiscusedLatelyEndDate.add(1, "day").format("YYYY-MM-DD"),
        accessToken,
        platformSelected,
        ""
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
    dispatch(
      changeDashboardMostDiscusedLatelyOptions({
        mostDiscusedLatelyStartDate: startDate,
        mostDiscusedLatelyEndDate: endDate,
      })
    );

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
                {mostDiscusedLatelyStartDate.format("DD MMM")} -{" "}
                {mostDiscusedLatelyEndDate.format("DD MMM YYYY")}
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
            Loading Most Discussed Data
          </div>
        ) : (
          data.length == 0 && (
            <div className="w-full h-48 flex justify-center items-center">
              No Data, Please select another date range or platform
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
