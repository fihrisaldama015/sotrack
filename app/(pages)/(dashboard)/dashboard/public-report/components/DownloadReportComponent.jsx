"use client";
import { DOWNLOAD } from "@/app/utils/assets";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useSelector } from "react-redux";

const DownloadReport = () => {
  const { publicReportData } = useSelector(
    (state) => state.publicReportDataReducer
  );
  const download = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Id,Date,Name,City,Message,Ditangani\n" +
      publicReportData
        .map(
          (report) =>
            `${report.id},"${dayjs(report.date).format("YYYY-MM-DD")}",${
              report.city
            },${report.message},${
              report.ditangani ? "Ditangani" : "Belum Ditangani"
            }`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document?.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Socialens - Public Report - ${dayjs().format("YYYY-MM-DD HH:mm:ss")}.csv`
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
