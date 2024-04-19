import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMostDiscusedLatelyByDate = async (
  startDate,
  endDate,
  token,
  platform
) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  const MOST_DISCUSSED = {
    message: "success",
    data: {
      Accident: 2,
      Thieft: 1,
      "Sexual Harasement": 1,
    },
  };
  const { data } = MOST_DISCUSSED;
  const { data: mostData } = await PROVIDER_GET(
    `mostDiscussed?platform=${platform}&pageId=112810043827081&since=${startDate}&until=${endDate}`,
    token
  );
  console.log("🚀 ~ mostData:", mostData);
  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let mostDiscussed = getFormattedMostDiscussed(data);

  return mostDiscussed;
};

const getFormattedMostDiscussed = (data) => {
  const formattedData = Object.keys(data).map((key) => {
    return {
      topic: key,
      mentions: data[key],
    };
  });

  return formattedData;
};
