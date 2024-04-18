import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMostDiscusedLatelyByDate = async (
  startDate,
  endDate,
  token
) => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `mostDiscussed?platform=facebook&pageId=290758567444646&since=${startDate}&until=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let mostDiscussed = data;
  console.log("🚀 ~ mostDiscussed:", mostDiscussed);
  return mostDiscussed;
};
