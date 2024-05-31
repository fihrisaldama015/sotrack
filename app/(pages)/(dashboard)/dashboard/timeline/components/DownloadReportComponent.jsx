"use client";
import { DOWNLOAD } from "@/app/utils/assets";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const DownloadReport = () => {
  const { timelineData, selectedPlatform } = useSelector(
    (state) => state.timelineDataReducer
  );
  const download = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Id,Caption,Permalink,Source,Timestamp\n" +
      timelineData
        .map(
          (post) =>
            `${post.id},${post.caption},${post.permalink},${
              post.source
            },"${dayjs(post.timestamp).format("YYYY-MM-DD HH:mm:ss")}"`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document?.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Socialens - Timeline ${selectedPlatform} - ${dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      )}.csv`
    );
    document.body.appendChild(link);
    link.click();
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
