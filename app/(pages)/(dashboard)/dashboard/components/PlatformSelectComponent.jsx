"use client";
import { getAllPlatform } from "@/app/api/repository/PlatformRepository";
import { changeDashboardPlatform } from "@/app/redux/slices/DashboardPlatformSlice";
import { PLATFORM_ICON } from "@/app/utils/constants";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const PlatformSelect = () => {
  const [showParameter, setShowParameter] = useState(false);
  const { platformSelected } = useSelector((state) => state.dashboardReducer);
  const [parameter, setParameter] = useState(platformSelected);
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  const handleParameterChange = async (type) => {
    setParameter(type);
    setShowParameter(false);
    dispatch(
      changeDashboardPlatform({
        platformSelected: type,
      })
    );
  };

  const { data: platforms, error } = useSWR(
    "/api/platform",
    () => getAllPlatformList(accessToken),
    {
      refreshInterval: 0, // Disable automatic refreshing
      revalidateOnFocus: false, // Disable revalidation on window focus
      staleTime: 60000, // Set a longer stale time (in milliseconds)
    }
  );
  if (!platforms) return <div>Loading platform data...</div>;
  return (
    <Box className="relative">
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={0.5}
        onClick={() => setShowParameter(!showParameter)}
        className="rounded-lg ring-1 ring-slate-200 hover:ring-slate-300 bg-white transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50"
      >
        {parameter.split("_").map((item, id) => (
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            key={id}
            className="text-xs font-normal first-letter:capitalize"
          >
            <Image
              src={
                parameter.toLowerCase() in PLATFORM_ICON
                  ? PLATFORM_ICON[parameter.toLowerCase()]
                  : "/assets/icon/news.svg"
              }
              width={16}
              height={16}
              alt="platform icon"
            />
            <Typography className="text-xs font-normal">{item}</Typography>
          </Stack>
        ))}

        <ExpandMore color="grey" sx={{ width: 16 }} />
      </Stack>
      <form
        className="absolute w-max left-0 top-8 bg-white ring-1 ring-slate-200 p-1 z-10 shadow-lg rounded-xl transition-all text-sm"
        style={{
          visibility: showParameter ? "visible" : "hidden",
          opacity: showParameter ? 1 : 0,
        }}
      >
        <Stack direction={"column"} spacing={0}>
          {platforms?.map((platform) => (
            <Box
              key={platform.id}
              onClick={() => handleParameterChange(platform.name)}
              className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
            >
              {platform.name}
            </Box>
          ))}
        </Stack>
      </form>
    </Box>
  );
};

export default PlatformSelect;

const getAllPlatformList = async (token) => {
  const res = await getAllPlatform(token);
  return res;
};
