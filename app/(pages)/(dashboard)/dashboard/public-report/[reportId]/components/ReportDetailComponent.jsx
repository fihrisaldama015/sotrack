"use client";
import dayjs from "dayjs";

const { Stack, Typography } = require("@mui/material");

const ReportDetail = ({ initialData }) => {
  console.log("🚀 ~ ReportDetail ~ initialData:", initialData);
  return (
    <Stack gap={3} direction={"column"} className="bg-white p-6 rounded-lg">
      <Stack direction={"column"} gap={1}>
        <Typography className="text-xl text-[#343A40] font-semibold">
          Detail Public Report
        </Typography>
        <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
          <Typography className="text-base font-bold text-black">
            {initialData.name}
          </Typography>
          <Typography className="text-sm text-black">
            {"<"}
            {initialData.email}
            {">"}
          </Typography>
        </Stack>
        <Typography className="text-base text-black">
          {initialData.phone}
        </Typography>
        <Typography className="text-base font-bold text-black">
          {initialData.category}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography className="text-base text-[#343A40]">
            {initialData.city} {initialData.province}
          </Typography>
          <Typography className="text-base text-[#333333]">
            Dikirim {dayjs(initialData.createdAt).format("DD MMM YYYY")}
          </Typography>
        </Stack>

        <div dangerouslySetInnerHTML={{ __html: initialData?.message }}></div>
      </Stack>
    </Stack>
  );
};

export default ReportDetail;
