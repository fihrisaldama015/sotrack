"use client";
import { useEffect, useState } from "react";
import MentionAnalyticsChart from "./MentionAnalyticsChartComponent";
import { useSelector } from "react-redux";

const MentionAnalyticsCard = () => {
  const [data, setData] = useState(SocialMediaMentionsData);
  const [title, setTitle] = useState("News Mentions");
  const dataLength = data[0].data.length;
  const latestValue = data[0].data[dataLength - 1].y;
  const firstValue = data[0].data[0].y;
  const growth = ((latestValue - firstValue) / firstValue) * 100;
  const { platformSelected } = useSelector((state) => state.dashboardReducer);
  console.log(
    "🚀 ~ MentionAnalyticsCard ~ platformSelected:",
    platformSelected
  );

  useEffect(() => {
    setTitle(`${platformSelected} Mentions`);
  }, [platformSelected]);

  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col flex-1">
      <p className="text-[#000000b2] text-sm font-medium m-0 mb-4">{title}</p>
      <div className="flex gap-2 items-center">
        <h1 className="text-[#000000] text-2xl font-black m-0">
          {latestValue > 0.1 ? latestValue : "0"}
        </h1>
        <p
          className="text-xs font-medium"
          style={{ color: growth > 0 ? "#34D399" : "#FF7575" }}
        >
          {growth > 0 ? `+` : ``}
          {growth.toFixed(2)}%
        </p>
      </div>
      <MentionAnalyticsChart data={data} trendUp={latestValue >= firstValue} />
    </div>
  );
};

export default MentionAnalyticsCard;

export const SocialMediaMentionsData = [
  {
    id: "Mention",
    color: "#2563EB",
    data: [
      {
        x: "Jan",
        y: 0.1,
      },
      {
        x: "Feb",
        y: 0.1,
      },
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
    ],
  },
];
