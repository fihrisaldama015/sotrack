"use client";
import { DOWNLOAD } from "@/app/utils/assets";
import { BASE_URL } from "@/app/utils/constants";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useSelector } from "react-redux";

const DownloadReport = () => {
  const { mediaBroadcastData } = useSelector(
    (state) => state.mediaBroadcastDataReducer
  );
  const download = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Id,Recipient,Subject,Message,Date,City,UserId,Attachments,CreatedAt\n" +
      mediaBroadcastData
        .map(
          (broadcast) =>
            `${broadcast.id},${broadcast.receipient},${broadcast.subject},${
              broadcast.message
            },"${dayjs(broadcast.date).format("YYYY-MM-DD")}",${
              broadcast.city
            },${broadcast.user_id},${broadcast.attachments
              .split(",")
              .map((file) => `"${BASE_URL}/${file}"`)
              .join("|")},${dayjs(broadcast.created_at).format(
              "YYYY-MM-DD HH:mm:ss"
            )}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document?.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Socialens - Media Broadcast Hub - ${dayjs().format(
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
