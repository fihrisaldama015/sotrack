"use client";
// import { getSourceTrackerByDate } from "@/app/api/repository/SourceTrackerRepository";
import {
  getAllReport,
  getLinkForm,
} from "@/app/api/repository/PublicReportRepository";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Close, Link, Public } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "./DatePickerComponent";
import PublicReportTable from "./PublicReportTableComponent";
import SearchBar from "./SearchBarComponent";
import { useDispatch } from "react-redux";
import { changePublicReportData } from "@/app/redux/slices/PublicReportDataSlice";

const PublicReportContent = ({ platformId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [chartStartDate, setChartStartDate] = useState(dayjs().date(0));
  const [chartEndDate, setChartEndDate] = useState(dayjs());

  const [openShare, setOpenShare] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [link, setLink] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const search = searchParams.get("search");
  const accessToken = getCookie("accessToken");

  const copyLink = () => {
    setShowCopied(true);
    navigator.clipboard.writeText(link);
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  };

  const getLinkFromProfile = async (token) => {
    const data = await getLinkForm(token);
    const id = data.link.split("/")[4];
    // setLink(`http://localhost:3000/form/${id}`);
    setLink(data.link);
    return data;
  };

  const getPublicReportData = async () => {
    setIsLoading(true);
    const response = await getAllReport(
      chartStartDate.format("YYYY-MM-DD"),
      chartEndDate.add(1, "day").format("YYYY-MM-DD"),
      accessToken
    );
    setData(response);
    dispatch(
      changePublicReportData({
        publicReportData: response,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getLinkFromProfile(accessToken);
    getPublicReportData();
  }, []);

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const filteredData = data.filter((item) => {
        return item.message.toLowerCase().includes(search.toLowerCase());
      });
      setIsSearching(true);
      setFilteredData(filteredData);
      setIsLoading(false);
    } else {
      setFilteredData([]);
      setIsSearching(false);
    }
  }, [search]);

  const refreshData = async (startDate, endDate) => {
    setChartStartDate(startDate);
    setChartEndDate(endDate);
    setIsLoading(true);
    const response = await getAllReport(
      startDate.format("YYYY-MM-DD"),
      endDate.add(1, "day").format("YYYY-MM-DD"),
      accessToken
    );
    setData(response);
    setIsLoading(false);
  };
  return (
    <>
      <Stack direction={"row"} className="gap-4" flexWrap={"wrap"}>
        <DatePicker
          chartStartDate={chartStartDate}
          chartEndDate={chartEndDate}
          refreshData={refreshData}
        />
        <SearchBar />
        <Box className="relative">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenShare((value) => !value)}
            className="px-8 py-3 rounded-[20px] text-base font-semibold text-white shadow-lg shadow-green-700/20"
          >
            Share Link Form
          </Button>
          <Box
            className={`absolute top-16 right-0 z-10 bg-white shadow-lg rounded-[10px] py-5 px-6 flex flex-col gap-4 transition-all ${
              openShare ? "opacity-100 visible" : "invisible opacity-0"
            }`}
          >
            <Stack spacing={1}>
              <Stack direction={"row"} className="">
                <Typography className="flex flex-1 justify-center items-start text-base font-semibold">
                  Share
                </Typography>
                <Close
                  onClick={() => {
                    setOpenShare(false);
                  }}
                  className="hover:bg-slate-200 rounded-full cursor-pointer transition-all "
                />
              </Stack>
              <Divider />
            </Stack>
            <Typography className="text-sm">
              Share the following link on your social media so that people can
              submit complaints or suggestions.
            </Typography>
            <Stack
              direction={"row"}
              className="ring-1 ring-neutral-300 rounded-md"
            >
              <Box className="bg-slate-200 text-slate-800 p-3 ring-1 ring-slate-300 rounded-tl-md rounded-bl-md flex items-center">
                <Link sx={{ width: 16 }} className="h-fit" />
              </Box>
              <Typography className="p-4 text-grey-800 tracking-wide text-sm max-w-[30ch] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
                {link.substring(0, 30)}...
              </Typography>
              <Box className="relative">
                <Button
                  className="m-1 py-3 px-5 rounded-md font-medium tracking-wide"
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={copyLink}
                  // sx={{ borderRadius: "6px" }}
                >
                  Copy
                </Button>
                <Box
                  className={`absolute py-1 px-4 -top-10 z-10 bg-white shadow-lg rounded-lg ring-1 ring-slate-300 font-medium text-sm transition-all ${
                    showCopied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Copied!
                </Box>
              </Box>
            </Stack>
            <Divider />
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Public sx={{ width: 16 }} />
              <Typography className="text-sm">
                Everyone on the internet can access that link
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Stack
        direction={"column"}
        spacing={3}
        className="px-7 py-6 bg-white  bg-red-500/10 rounded-[10px]"
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography className="text-base font-bold text-primary-800 first-letter:capitalize">
            Public Report
          </Typography>
        </Stack>
        {isLoading ? (
          <div className="w-full h-48 flex justify-center items-center">
            <LoadingSpinner />
            Loading Data...
          </div>
        ) : (
          <PublicReportTable
            initialData={isSearching ? filteredData : data}
            refresh={getPublicReportData}
          />
        )}
      </Stack>
    </>
  );
};

export default PublicReportContent;
