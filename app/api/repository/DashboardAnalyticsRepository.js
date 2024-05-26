import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

// CRIME STATISTICS
export const getCrimeStatisticByDate = async (
  startDate,
  endDate,
  platform,
  token
) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `criminalType?platform=${platform}&from=${startDate}&to=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  // let crimeData = [];
  let crimeData = getTypeOfCrime(data);
  return crimeData;
};

const getTypeOfCrime = (data) => {
  const typeOfCrime = [];
  Object.keys(data).map((type) => {
    typeOfCrime.push({
      type_of_crime: type,
      data: data[type],
    });
  });
  return typeOfCrime;
};

// CRIMINAL REPORT
export const getCriminalReportByType = async (type, platform, token) => {
  const res = await PROVIDER_GET(
    `criminalReports?platform=${platform}&period=${type}`,
    token
  );
  const data = platform == "facebook" ? res.data.countsByYear : res.data;
  let chartData = [];

  if (type === "monthly") {
    chartData = getMonthlyCriminalReport(data);
  } else if (type === "yearly") {
    chartData = getYearlyCriminalReport(data);
  } else if (type === "weekly") {
    chartData = getWeeklyCriminalReport(data);
  }

  return chartData;
};

const getYearlyCriminalReport = (data) => {
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
      index: key,
      data: totalCountPerYear,
    });
  });
  return yearData;
};

const getMonthlyCriminalReport = (data) => {
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
        index: `${month[key]} ${current_year}`,
        data: totalCount,
      });
    });
  });

  return monthlyData;
};

const getWeeklyCriminalReport = (data) => {
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
            index: `Week ${key} (${current_year})`,
            data: temp_week,
          });
        }
        temp_week_index = key;
      });
    });
  });

  return weeklyData;
};

// SENTIMENT ANALYSIS
export const getSentimentAnalysisByDate = async (
  startDate,
  endDate,
  platform,
  token
) => {
  const { data } = await PROVIDER_GET(
    `sentimentAnalysis?platform=${platform}&from=${startDate}&to=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }

  let sentimentData = {};
  sentimentData = getSentimentData(data);
  return sentimentData;
};

const getSentimentData = (data) => {
  const sentimentData = {};
  Object.keys(data).map((key) => {
    sentimentData[key] = data[key].split("%")[1];
  });
  return sentimentData;
};
