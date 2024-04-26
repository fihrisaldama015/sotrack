import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMostDiscusedLatelyByDate = async (
  startDate,
  endDate,
  token,
  platform,
  pageId = ""
) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { data: mostData } = await PROVIDER_GET(
    `mostDiscussed?platform=${platform}&pageId=${pageId}&since=${startDate}&until=${endDate}`,
    // `mostDiscussed?platform=${platform}&pageId=290758567444646&since=${startDate}&until=${endDate}`,
    token
  );
  console.log("🚀 ~ mostData:", mostData);
  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let mostDiscussed = getFormattedMostDiscussed(mostData);

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
