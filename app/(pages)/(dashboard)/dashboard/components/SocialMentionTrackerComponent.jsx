"use client";
import {
  getMentionSource,
  getPageList,
} from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeDashboardMentionSource } from "@/app/redux/slices/DashboardDataSlice";
import { changeDashboardOptions } from "@/app/redux/slices/DashboardOptionsSlice";
import { PLATFORM_ICON } from "@/app/utils/constants";
import { openPopUpError } from "@/app/utils/extensions";
import CalendarToday from "@mui/icons-material/CalendarToday";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SocialMentionTracker = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { platformSelected } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const { sourceTrackerStartDate, sourceTrackerEndDate } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  const getMentionSourceData = async (start, end) => {
    try {
      setIsLoading(true);
      const mentionSourceResult = await getMentionSource(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        accessToken,
        platformSelected.toLowerCase()
      );
      setData(mentionSourceResult);
      dispatch(
        changeDashboardMentionSource({
          mentionSourceData: mentionSourceResult,
        })
      );
    } catch (error) {
      setData([]);
      console.log("🚀 ~ error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMentionSourceData(sourceTrackerStartDate, sourceTrackerEndDate);
  }, [platformSelected]);

  const refreshData = async () => {
    dispatch(
      changeDashboardOptions({
        sourceTrackerStartDate: startDate,
        sourceTrackerEndDate: endDate,
      })
    );
    if (startDate.isAfter(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }
    if (startDate.isAfter(dayjs()) || endDate.isAfter(dayjs())) {
      alert("Date cannot be in the future");
      return;
    }
    setShowDatePicker(false);
    getMentionSourceData(startDate, endDate);
  };
  return (
    <Box className="p-6 bg-white flex flex-col gap-6 rounded-xl shadow-lg shadow-slate-100">
      <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
        <Stack direction={"column"} gap={1}>
          <Typography className="text-xs text-grey-800">
            Overall Mentions Source
          </Typography>
          <Typography className="text-base font-semibold text-primary-800">
            Mention Source Tracker
          </Typography>
        </Stack>
        <Stack direction={"column"} spacing={1} alignItems={"center"}>
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
                {sourceTrackerStartDate.format("DD MMM")} -{" "}
                {sourceTrackerEndDate.format("DD MMM YYYY")}
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

      {isLoading ? (
        <div className="w-full h-48 flex justify-center items-center">
          <LoadingSpinner />
          Loading Social Mention Data
        </div>
      ) : (
        data.length == 0 && (
          <div className="w-full h-full px-6 flex justify-center items-center text-center">
            <p className="max-w-[27ch]">
              No Data, Please select another date range or platform
            </p>
          </div>
        )
      )}
      <Box
        className="h-[300px] overflow-auto"
        sx={{ display: isLoading ? "none" : "" }}
      >
        <Table>
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
                    href={`/source/${data.source}${
                      platformSelected != "News"
                        ? "?pageId=" +
                          data.id +
                          "&sourceType=" +
                          data.sourceType
                        : ""
                    }${
                      platformSelected == "Instagram"
                        ? "&instagram_id=" + data.id
                        : ""
                    }`}
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
    </Box>
  );
};

export default SocialMentionTracker;
