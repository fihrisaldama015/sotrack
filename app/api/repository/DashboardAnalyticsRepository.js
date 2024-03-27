import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getCrimeStatisticByDate = async (startDate, endDate, token) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `criminalType?from=${startDate}&to=${endDate}`,
    // `https://jsonplaceholder.typicode.com/posts?start_date=${startDate}&end_date=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  // let crimeData = generateCrimeData(7);
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
