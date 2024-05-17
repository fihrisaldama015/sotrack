import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMentionSource = async (startDate, endDate, token, pageId) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `mentionSource?pageId=${pageId}&since=${startDate}&until=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let sourceTrackerData = getFormattedMentionSource(data);

  return sourceTrackerData;
};

const getFormattedMentionSource = (data) => {
  const formattedData = Object.keys(data).map((key) => {
    return {
      source: key,
      mentions: data[key],
    };
  });

  return formattedData;
};

export const getPageList = async () => {
  const {
    data: { data },
  } = await PROVIDER_GET(`facebook/page`);

  let pageListData = data;
  return pageListData;
};

export const getMentionSourceDetail = async (
  startDate,
  endDate,
  token,
  pageId = "",
  platform,
  topic = "All",
  source = ""
) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  try {
    let url = `mentionDetails?platform=${platform}&pageId=${pageId}&since=${startDate}&until=${endDate}&topic=${topic}`;
    if (platform == "news") {
      url = `mentionDetails?platform=${platform}&since=${startDate}&until=${endDate}&topic=${topic}&source=${source}`;
    }

    const { data } = await PROVIDER_GET(url, token);

    if (currentDate < startDate || currentDate < endDate) {
      throw new Error("Invalid date");
    }
    let mentionSourceDetailData = getFormattedMentionSourceDetail(data);

    return mentionSourceDetailData;
  } catch (e) {
    alert(`🚀 ~ getMentionSourceDetail ~ e:${e.response.data.message}`);
    return [];
  }
};

const getFormattedMentionSourceDetail = (data) => {
  const mentionSourceDetail = [];
  try {
    data.forEach((item, i) => {
      mentionSourceDetail.push({
        no: i + 1,
        id: `#${item.id.substring(0, 6)}`,
        date: dayjs(item.created_time).format("MMM DD, YYYY"),
        source: item?.url ? item.url : "",
        mention: item.mention,
        about: item.about,
      });
    });

    return mentionSourceDetail;
  } catch (e) {
    console.log("🚀 ~ getFormattedMentionSourceDetail ~ e:", e);
    return [];
  }
};
