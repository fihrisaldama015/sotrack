"use client";
import { useEffect, useState } from "react";
import MentionAnalyticsChart from "./MentionAnalyticsChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { getSocialMediaMention } from "@/app/api/repository/SocialMediaMentionRepository";
import { changeDashboardSocialMention } from "@/app/redux/slices/DashboardDataSlice";

const MentionAnalyticsCard = () => {
  const [data, setData] = useState(SocialMediaMentionsData);
  console.log("🚀 ~ MentionAnalyticsCard ~ data:", data);
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState("News Mentions");
  const dataLength = data.length;
  console.log("🚀 ~ MentionAnalyticsCard ~ dataLength:", dataLength);
  const latestValue = dataLength == 0 ? 0 : data[data.length - 1].y;
  const firstValue = dataLength == 0 ? 0 : data[0].y;
  const growth = ((latestValue - firstValue) / firstValue) * 100;
  const { platformSelected } = useSelector(
    (state) => state.dashboardOptionsReducer
  );
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  const getMentionAnalyticsData = async () => {
    const socialMentionData = await getSocialMediaMention(
      platformSelected.toLowerCase(),
      accessToken
    );
    setTotal(socialMentionData.total);
    setData(socialMentionData.chartData);
    dispatch(
      changeDashboardSocialMention({
        socialMentionData: socialMentionData,
      })
    );
    return socialMentionData;
  };

  useEffect(() => {
    setTitle(`${platformSelected} Mentions`);
    getMentionAnalyticsData();
  }, [platformSelected]);

  useEffect(() => {
    getMentionAnalyticsData();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col flex-1">
      <p className="text-[#000000b2] text-sm font-medium m-0 mb-4">{title}</p>
      <div className="flex gap-2 items-center">
        <h1 className="text-[#000000] text-2xl font-black m-0">
          {total > 0.1 ? total : "0"}
        </h1>
        <p
          className="text-xs font-medium"
          style={{ color: growth > 0 ? "#34D399" : "#FF7575" }}
        >
          {growth > 0 ? `+` : ``}
          {growth.toFixed(2)}%
        </p>
      </div>
      <MentionAnalyticsChart
        data={[
          {
            id: "Mention",
            color: "#2563EB",
            data: data,
          },
        ]}
        trendUp={latestValue >= firstValue}
      />
    </div>
  );
};

export default MentionAnalyticsCard;

export const SocialMediaMentionsData = [
  {
    x: "Jan",
    y: 10,
  },
  {
    x: "Feb",
    y: 0.1,
  },
];
// {
//   x: "Jan",
//   y: 54,
// },
// {
//   x: "Feb",
//   y: 117,
// },
// {
//   x: "Mar",
//   y: 44,
// },
// {
//   x: "Apr",
//   y: 215,
// },
// {
//   x: "Mei",
//   y: 50,
// },
// {
//   x: "Jun",
//   y: 233,
// },
