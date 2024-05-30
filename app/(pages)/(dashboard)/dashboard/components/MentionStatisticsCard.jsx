"use client";
import { useEffect, useState } from "react";
import MentionStatisticsChart from "./MentionStatisticsChartComponent";
import { getCookie } from "cookies-next";
import { getSocialMediaMention } from "@/app/api/repository/SocialMediaMentionRepository";
import { Box, Stack, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getMentionAnalyticsByPlatform } from "@/app/api/repository/MentionAnalyticsRepository";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const MentionStatisticsCard = ({ title }) => {
  const [showParameter, setShowParameter] = useState(false);
  const [parameter, setParameter] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(SocialMediaMentionsData);

  const dataLength = chartData.length;
  const firstValue = dataLength == 0 ? 0 : chartData[0].y;
  const latestValue = dataLength < 1 ? firstValue : chartData[dataLength - 1].y;
  const growth =
    dataLength < 1 ? 0 : ((latestValue - firstValue) / firstValue) * 100;

  const { platformSelected } = useSelector((state) => state.dashboardReducer);
  const accessToken = getCookie("accessToken");

  const handleParameterChange = async (type) => {
    setParameter(type);
    setShowParameter(false);
    setIsLoading(true);
    try {
      const socialMentionData = await getMentionAnalyticsByPlatform(
        platformSelected.toLowerCase(),
        type,
        accessToken
      );

      if (socialMentionData.length == 1) {
        socialMentionData.push({
          x: socialMentionData[0].x + ".",
          y: socialMentionData[0].y,
        });
      }
      setChartData(socialMentionData);
    } catch (error) {
      console.log("🚀 ~ refreshChart - MentionStatisticCard ~ error:", error);
      setChartData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // if (platformSelected != "News") return;
    handleParameterChange("monthly");
  }, [platformSelected]);

  useEffect(() => {
    handleParameterChange("monthly");
  }, []);

  return (
    <div className="relative bg-white rounded-2xl p-7 flex flex-col flex-1 gap-7">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
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
        </Stack>
        <Box className="relative">
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0.5}
            onClick={() => setShowParameter(!showParameter)}
            className="rounded-lg ring-1 ring-slate-50 hover:ring-slate-200 transition-all pl-3 py-1 pr-2 cursor-pointer hover:bg-slate-50"
          >
            <Typography className="text-xs font-normal first-letter:capitalize">
              {parameter}
            </Typography>
            <ExpandMore color="grey" sx={{ width: 16 }} />
          </Stack>
          <form
            className="absolute right-0 top-8 bg-slate-50 p-1 z-10 shadow-lg rounded-xl transition-all text-sm"
            style={{
              visibility: showParameter ? "visible" : "hidden",
              opacity: showParameter ? 1 : 0,
            }}
          >
            <Stack direction={"column"} spacing={0}>
              <Box
                onClick={() => handleParameterChange("monthly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Month
              </Box>
              <Box
                onClick={() => handleParameterChange("yearly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Year
              </Box>
              <Box
                onClick={() => handleParameterChange("weekly")}
                className="bg-slate-50 px-3 py-1 hover:bg-slate-200 transition-all rounded-lg cursor-pointer"
              >
                Week
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 w-fit">
          <LoadingSpinner />
          Loading Chart Data
        </div>
      )}
      <MentionStatisticsChart
        data={[
          {
            id: "Mention",
            color: "#2563EB",
            data: isLoading ? [] : chartData,
          },
        ]}
        trendUp={latestValue >= firstValue}
      />
    </div>
  );
};

export default MentionStatisticsCard;

export const SocialMediaMentionsData = [
  {
    x: "Jan",
    y: 0.1,
  },
  {
    x: "Feb",
    y: 0.1,
  },
];
