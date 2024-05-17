"use client";
import { useEffect, useState } from "react";
import MentionStatisticsChart from "./MentionStatisticsChartComponent";
import { getCookie } from "cookies-next";
import { getSocialMediaMention } from "@/app/api/repository/SocialMediaMentionRepository";

const MentionStatisticsCard = ({ title, data }) => {
  const [initialData, setData] = useState(data);
  const dataLength = data[0].data.length;
  const latestValue = data[0].data[dataLength - 1].y;
  const firstValue = data[0].data[0].y;
  const growth = ((latestValue - firstValue) / firstValue) * 100;

  const getInitialSocialMentionData = async () => {
    const token = getCookie("accessToken");
    const data = await getSocialMediaMention(token);
    console.log("🚀 ~ getInitialSocialMentionData ~ data:", data);
    // setData(data);
  };

  useEffect(() => {
    getInitialSocialMentionData();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col flex-1">
      <p className="text-xs text-[#64748B]">Mention Received</p>
      <p className="text-primary-800 text-base font-semibold m-0 mb-4">
        {title}{" "}
        <span
          className="text-xs font-medium"
          style={{ color: growth > 0 ? "#34D399" : "#FF7575" }}
        >
          {growth > 0 ? `+` : ``}
          {growth.toFixed(2)}%
        </span>
      </p>

      <MentionStatisticsChart data={data} trendUp={latestValue >= firstValue} />
    </div>
  );
};

export default MentionStatisticsCard;
