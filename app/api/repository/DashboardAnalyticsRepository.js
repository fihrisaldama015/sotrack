import axios from "axios";
import { PROVIDER_GET } from "../provider";
import dayjs from "dayjs";

export const getCrimeStatisticByDate = async (startDate, endDate, token) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  const res = await axios.get(
    //   `crime-statistic?start_date=${startDate}&end_date=${endDate}`,
    `https://jsonplaceholder.typicode.com/posts?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let data = generateCrimeData(7);
  return data;
};

const CRIME_VARIETIES = [
  "Robbery",
  "Assault",
  "Fraud",
  "Burglary",
  "Vandalism",
  "Arson",
  "Shoplifting",
  "Cybercrime",
  "Homicide",
  "Forgery",
  "Drug Trafficking",
  "Identity Theft",
  "Kidnapping",
  "Car Theft",
  "Domestic Violence",
  "Human Trafficking",
  "Stalking",
  "Terror",
];

const generateRandomCrimeVariety = () => {
  const randomIndex = Math.floor(Math.random() * CRIME_VARIETIES.length);
  return CRIME_VARIETIES[randomIndex];
};

const generateRandomCrimeData = (newData) => {
  const type_of_crime = generateRandomCrimeVariety();

  if (newData.some((data) => data.type_of_crime === type_of_crime)) {
    return generateRandomCrimeData(newData);
  }
  const jumlah_laporan = Math.floor(Math.random() * 700) + 201;
  const data = Math.floor(Math.random() * 700) + 201;

  return {
    type_of_crime,
    "jumlah laporan": jumlah_laporan,
    data,
  };
};

const generateCrimeData = (count) => {
  const newData = [];
  for (let i = 0; i < count; i++) {
    newData.push(generateRandomCrimeData(newData));
  }
  return newData;
};

export const getCriminalReportByType = async (type, token) => {
  const res = await PROVIDER_GET(`criminalReports?range=${type}`, token);
  const data = res.data;
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
  const weeklyData = [];

  Object.keys(data).map((key) => {
    const temp_year = data[key];
    const current_year = key;
    Object.keys(temp_year).map((key) => {
      const temp_month = temp_year[key];
      const current_month = key;
      Object.keys(temp_month).map((key) => {
        const temp_week = temp_month[key];

        weeklyData.push({
          index: `Week ${key} (${current_year})`,
          data: temp_week,
        });
      });
    });
  });

  return weeklyData;
};

// const generateRandomCriminalReportData = (type) => {
//   let data;
//   switch (type) {
//     case "monthly":
//       data = generateMonthlyCriminalReportData();
//       break;
//     case "yearly":
//       data = generateYearlyCriminalReportData();
//       break;
//     case "weekly":
//       data = generateWeeklyCriminalReportData();
//       break;
//     default:
//       throw new Error("Invalid type");
//   }
//   return data;
// };

// const generateMonthlyCriminalReportData = () => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const monthlyData = [];
//   for (let i = 0; i < 12; i++) {
//     const monthIndex = i;
//     const data = Math.floor(Math.random() * 350) + 51;
//     monthlyData.push({
//       index: months[monthIndex],
//       data: data,
//     });
//   }
//   return monthlyData;
// };

// const generateYearlyCriminalReportData = () => {
//   const startYear = 2016;
//   const endYear = 2024;
//   const yearlyData = [];
//   for (let year = startYear; year <= endYear; year++) {
//     const data = Math.floor(Math.random() * 1500) + 501;
//     yearlyData.push({
//       index: year.toString(),
//       data: data,
//     });
//   }
//   return yearlyData;
// };

// const generateWeeklyCriminalReportData = () => {
//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const weeklyData = [];
//   for (let i = 0; i < 7; i++) {
//     const dayIndex = i;
//     const data = Math.floor(Math.random() * 30) + 1;
//     weeklyData.push({
//       index: daysOfWeek[dayIndex],
//       data: data,
//     });
//   }
//   return weeklyData;
// };
