import { PROVIDER_GET } from "../provider";

export const getMentionAnalyticsByPlatform = async (
  platform,
  period,
  token
) => {
  try {
    let url = `mentionAnalytic?platform=${platform}&period=${period}`;
    const response = await PROVIDER_GET(url, token);
    const data = response.data;
    if (!data || Object.keys(data).length === 0) throw "No Response Data";
    let chartData = [];
    if (period == "monthly") {
      chartData = getMonthlyMentionAnalytics(data);
    } else if (period == "yearly") {
      chartData = getYearlyCMentionAnalytics(data);
    } else if (period == "weekly") {
      chartData = getWeeklyCMentionAnalytics(data);
    }

    return chartData;
  } catch (error) {
    console.log("🚀 ~ getMentionAnalyticsByPlatform:", error);
    return [
      {
        x: "first",
        y: 0.1,
      },
      {
        x: "second",
        y: 0.1,
      },
    ];
  }
};

const getYearlyCMentionAnalytics = (data) => {
  const yearData = [];

  Object.keys(data).map((key) => {
    let totalCountPerYear = 0;
    const temp_year = data[key];
    Object.keys(temp_year).map((key) => {
      let totalCountPerMonth = 0;
      const temp_month = temp_year[key];
      Object.keys(temp_month).map((key) => {
        totalCountPerMonth += temp_month[key];
      });
      totalCountPerYear += totalCountPerMonth;
    });
    yearData.push({
      x: key,
      y: totalCountPerYear,
    });
  });
  return yearData;
};

const getMonthlyMentionAnalytics = (data) => {
  const monthlyData = [];
  const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  Object.keys(data).map((key) => {
    const temp_year = data[key];
    const current_year = key;
    Object.keys(temp_year).map((key) => {
      let totalCount = 0;
      const temp_month = temp_year[key];
      Object.keys(temp_month).map((key) => {
        totalCount += temp_month[key];
      });
      monthlyData.push({
        x: `${month[key]} ${current_year}`,
        y: totalCount,
      });
    });
  });

  return monthlyData;
};

const getWeeklyCMentionAnalytics = (data) => {
  let weeklyData = [];
  let temp_week_index = 0;

  Object.keys(data).map((key) => {
    const temp_year = data[key];
    const current_year = key;
    Object.keys(temp_year).map((key) => {
      const temp_month = temp_year[key];

      Object.keys(temp_month).map((key) => {
        const temp_week = temp_month[key];

        if (temp_week_index === key) {
          weeklyData[weeklyData.length - 1].data += temp_week;
        } else {
          weeklyData.push({
            x: `Week ${key} (${current_year})`,
            y: temp_week,
          });
        }
        temp_week_index = key;
      });
    });
  });

  return weeklyData;
};
