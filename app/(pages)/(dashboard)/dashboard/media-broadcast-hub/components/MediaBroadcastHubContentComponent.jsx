"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Add from "@mui/icons-material/Add";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "./DatePickerComponent";
import MediaBroadcastHubTable from "./MediaBroadcastTableComponent";
import SearchBar from "./SearchBarComponent";
import { getMediaBroadcastEmailList } from "@/app/api/repository/MediaBroadcastRepository";
import Link from "next/link";

const MediaBroadcastHubContent = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [chartStartDate, setChartStartDate] = useState(dayjs().date(0));
  const [chartEndDate, setChartEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, SetSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const accessToken = getCookie("accessToken");

  const getInitialEmailData = async () => {
    try {
      const res = await getMediaBroadcastEmailList(
        accessToken,
        1,
        10,
        dayjs().date(0).format("YYYY-MM-DD"),
        dayjs().add(1, "day").format("YYYY-MM-DD")
      );
      setData(res);
    } catch (e) {
      console.log("🚀 ~ useEffect ~ e", e);
    }
  };

  // useEffect(() => {
  //   getInitialEmailData();
  // }, []);

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      setIsSearching(true);
      const filteredData = data.filter((item) => {
        return item.message.toLowerCase().includes(search.toLowerCase());
      });
      SetSearchData(filteredData);
      setIsLoading(false);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  const refreshData = async (startDate, endDate) => {
    setChartStartDate(startDate);
    setChartEndDate(endDate);
    try {
      setIsLoading(true);
    } catch (error) {
      console.log("🚀 ~ refreshChart ~ error:", error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Stack direction={"row"} className="gap-2" flexWrap={"wrap"}>
        <Button
          variant="contained"
          color="primary"
          className="px-4 py-1 rounded-lg text-base font-semibold text-white shadow-lg shadow-blue-700/20 m-1 "
        >
          <Link
            href={"media-broadcast-hub/new"}
            className="flex items-center gap-2 no-underline"
          >
            <Add className="text-white" />
            <Typography className="text-base font-semibold text-white">
              Add New
            </Typography>
          </Link>
        </Button>
        <Button
          variant="contained"
          color="error"
          className="px-4 py-1 rounded-lg text-base font-semibold text-white shadow-lg shadow-red-700/20 m-1 flex items-center gap-2"
        >
          <DeleteForeverOutlined />
          <Typography className="text-base font-semibold text-white">
            Delete
          </Typography>
        </Button>
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
          <MediaBroadcastHubTable
            initialData={isSearching ? searchData : data}
          />
        )}
      </Stack>
    </>
  );
};

export default MediaBroadcastHubContent;
