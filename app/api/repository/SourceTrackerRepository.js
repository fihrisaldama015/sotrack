import dayjs from "dayjs";
import { PROVIDER_GET } from "../provider";

export const getMentionSource = async (
  startDate,
  endDate,
  token,
  platform,
  pageId
) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { data } = await PROVIDER_GET(
    `mentionSource?platform=${platform}&since=${startDate}&until=${endDate}`,
    token
  );

  if (currentDate < startDate || currentDate < endDate) {
    throw new Error("Invalid date");
  }
  let mentionSource = getFormattedMentionSource(data, platform);

  return mentionSource;
};

const getFormattedMentionSource = (data, platform) => {
  let joinedData = {};
  let formattedData = [];

  if (platform == "news") {
    Object.keys(data).map((source) => {
      joinedData = { ...joinedData, ...data[source] };
    });
    formattedData = Object.keys(joinedData).map((key) => {
      return {
        source: key,
        mentions: joinedData[key].totalPosts,
      };
    });
  } else if (platform == "facebook" || platform == "instagram") {
    Object.keys(data).map((sourceType) => {
      const result = data[sourceType];
      const temp = Object.keys(result).map((username) => {
        return {
          source: username,
          mentions: result[username].totalPosts,
          id:
            platform == "facebook"
              ? result[username].page_id
              : result[username].id,
          sourceType: sourceType,
        };
      });
      formattedData = [...formattedData, ...temp];
    });
  }
  console.log("🚀 ~ getFormattedMentionSource ~ formattedData:", formattedData);
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
  source = "",
  instagram_id = ""
) => {
  const currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  try {
    let url = `mentionDetails?platform=${platform}&pageId=${pageId}&since=${startDate}&until=${endDate}&topic=${topic}&source=${source}`;
    if (platform == "news") {
      url = `mentionDetails?platform=${platform}&since=${startDate}&until=${endDate}&topic=${topic}&source=${source}`;
    } else if (platform == "instagram") {
      url = `mentionDetails?platform=${platform}&pageId=${pageId}&since=${startDate}&until=${endDate}&topic=${topic}&source=${source}&instagram_id=${instagram_id}`;
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
