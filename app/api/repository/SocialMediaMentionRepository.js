import { PROVIDER_GET } from "../provider";

export const getSocialMediaMention = async (platform, token) => {
  try {
    let url = "";
    if (platform == "news") {
      url = "newsMention";
    } else {
      url = "socialMediaMention";
    }
    const { data } = await PROVIDER_GET(url, token);
    if (!data) throw "No Response Data";
    const response = {
      total: data.total,
      chartData:
        platform == "news"
          ? formatDataToChart(data.news)
          : formatDataToChart(data.posts),
    };

    return response;
  } catch (error) {
    console.log("🚀 ~ getSocialMediaMention ~ error:", error);
    return {
      total: 0,
      chartData: [
        {
          x: "first",
          y: 0.1,
        },
        {
          x: "second",
          y: 0.1,
        },
      ],
    };
  }
};

const formatDataToChart = (data) => {
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
