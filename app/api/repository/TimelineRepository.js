import { PROVIDER_GET } from "../provider";

export const getTimelineByPlatform = async (
  token,
  platform,
  pageId = "",
  mention = "",
  hashtag = "",
  order = "newest",
  keyword = ""
) => {
  try {
    let URL = `timeline?platform=${platform}&pageId=${pageId}`;
    if (platform == "instagram") {
      if (hashtag == "") {
        URL = `timeline?platform=${platform}&pageId=${pageId}&mention=${mention}`;
      } else if (mention == "") {
        URL = `timeline?platform=${platform}&pageId=${pageId}&hashtag=${hashtag}&order=${order}`;
      }
    } else if (platform == "news") {
      URL = `timeline?platform=${platform}&keyword=${keyword}`;
    }
    const { data } = await PROVIDER_GET(URL, token);

    let timelineData = data;

    return timelineData;
  } catch (e) {
    console.log("🚀 ~ getTimelineByPlatform - e:", e);
    return [];
  }
};
