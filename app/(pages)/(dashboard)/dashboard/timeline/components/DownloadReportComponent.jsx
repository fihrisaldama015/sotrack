"use client";
import { DOWNLOAD } from "@/app/utils/assets";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DownloadReport = () => {
  const { timelineData } = useSelector((state) => state.timelineDataReducer);
  const download = () => {
    console.log("Download report => ", timelineData);
  };
  return (
    <Box
      onClick={download}
      display={"flex"}
      className="gap-2 hover:bg-slate-200 p-2 pr-3 rounded-lg cursor-pointer transition-all"
    >
      <Image src={DOWNLOAD} alt="Download Logo" width={22} height={23} />
      <Typography className="text-sm text-[#4D4D4D] font-medium">
        Download Report
      </Typography>
    </Box>
  );
};

export default DownloadReport;
