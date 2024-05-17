"use client";
import {
  getMentionSource,
  getPageList,
} from "@/app/api/repository/SourceTrackerRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeIsPopUpOpen } from "@/app/redux/slices/PopupSlice";
import { PLATFORM_ICON } from "@/app/utils/constants";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
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

const checkConnectedInstagramFromFacebook = (pageList) => {
  const connectedPage = pageList.find(
    (page) => "instagram_business_account" in page
  );
  if (connectedPage) {
    return connectedPage.id;
  }
  return "";
};

const SocialMentionTracker = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [parameter, setParameter] = useState("");
  const [showParameter, setShowParameter] = useState(false);

  const [pageList, setPageList] = useState([]);

  const [startDate, setStartDate] = useState(dayjs().date(1));
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [chartStartDate, setChartStartDate] = useState(startDate);
  const [chartEndDate, setChartEndDate] = useState(endDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { facebookPageList } = useSelector((state) => state.facebookReducer);

  const accessToken = getCookie("accessToken");
  const dispatch = useDispatch();

  const getMentionSourceData = async (start, end) => {
    try {
      setIsLoading(true);
      const mentionSourceResult = await getMentionSource(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        accessToken,
        parameter
      );
      setData(mentionSourceResult);
    } catch (error) {
      openPopUpError(
        dispatch,
        error?.response?.data?.message
          ? error.response.data.message
          : "Terjadi kesalahan dari server, coba lagi"
      );
      setData([]);
      console.log("🚀 ~ error:", error);
    }
    setIsLoading(false);
  };

  const getPageListData = async () => {
    try {
      const pageListResult = await getPageList();
      const pageId = checkConnectedInstagramFromFacebook(pageListResult);
      setParameter(pageId);
      setPageList(pageListResult);
    } catch (error) {
      dispatch(
        changeIsPopUpOpen({
          isPopUpOpen: true,
          popUpMessage:
            "Congratulations, you are on the Socialens dashboard, next please connect your social media account!",
          popUpType: "welcome",
        })
      );
      console.log("🚀 ~ error - Get Page List:", error);
    }
  };

  useEffect(() => {
    if (parameter !== "") {
      getMentionSourceData(chartStartDate, chartEndDate);
    }
  }, [parameter]);

  useEffect(() => {
    if (facebookPageList.length === 0) {
      getPageListData();
    } else {
      setPageList(facebookPageList);
      setParameter(checkConnectedInstagramFromFacebook(facebookPageList));
    }
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
    getMentionSourceData(startDate, endDate);

    setChartStartDate(startDate);
    setChartEndDate(endDate);
  };
  return (
    <Box className="p-6 bg-white flex flex-col gap-6 rounded-xl shadow-lg shadow-slate-100">
      <Stack direction={"row"} justifyContent={"space-between"}>
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

      {isLoading ? (
        <div className="w-full h-48 flex justify-center items-center">
          <LoadingSpinner />
          {pageList.length == 0
            ? "Loading Facebook Page List"
            : "Loading Social Mention Data"}
        </div>
      ) : (
        data.length == 0 && (
          <div className="w-full h-48 flex justify-center items-center">
            {pageList.length == 0
              ? "No Connected Facebook Account, go to Connect Account Menu"
              : "No Data, Please select another date range or platform"}
          </div>
        )
      )}
      <Box className="h-[300px] overflow-auto">
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
                    href={`/source/${data.source}`}
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
