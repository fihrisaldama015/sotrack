"use client";
import { getMediaBroadcastEmailDetail } from "@/app/api/repository/MediaBroadcastRepository";
import { BASE_URL } from "@/app/utils/constants";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Stack, Typography } = require("@mui/material");

const MediaBroadcastDetail = ({ params }) => {
  const [emailData, setEmailData] = useState([]);
  const [sender, setSender] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getCookie("accessToken");

  const getInitialData = async (id, token) => {
    const response = await getMediaBroadcastEmailDetail(id, token);
    setEmailData(response.email);
    setSender(response.sender);
    setIsLoading(false);
  };

  useEffect(() => {
    getInitialData(params.broadcastId, accessToken);
  }, []);
  const username = "You";
  const email = "your_email";
  const subject = "SUBJECT";
  if (isLoading) return <div>Loading...</div>;
  return (
    <Stack gap={3} direction={"column"} className="bg-white p-6 rounded-lg">
      <Stack direction={"column"} gap={1}>
        <Typography className="text-xl text-[#343A40] font-semibold">
          Detail Broadcast
        </Typography>
        <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
          <Typography className="text-base font-bold text-black">
            {username}
          </Typography>
          <Typography className="text-sm text-black">
            {"<"}
            {sender}
            {">"}
          </Typography>
        </Stack>
        <Typography className="text-base text-black">
          Kepada {emailData?.receipient}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography className="text-base text-right text-black">
          Dikirim {dayjs(emailData?.createdAt).format("DD MMM YYYY")}
        </Typography>
        <Typography className="text-base font-semibold text-center text-[#343A40]">
          {emailData?.subject}
        </Typography>
        <Typography className="text-base text-[#333333]">
          {emailData?.city}, {dayjs(emailData?.date).format("DD MMM YYYY")}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: emailData?.message }}></div>
        <Typography className="text-base text-[#333333] font-semibold">
          {emailData?.attachments?.split(",").length} Lampiran
        </Typography>
        <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
          {emailData?.attachments?.split(",").length > 0 &&
            emailData?.attachments
              ?.split(",")
              .map((item, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}/${item}`}
                  alt={item}
                  className="w-36 h-28 object-cover ring-1 ring-slate-300 shadow-sm"
                />
              ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MediaBroadcastDetail;
