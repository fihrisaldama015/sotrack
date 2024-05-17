import { PROVIDER_GET } from "../provider";

export const getSocialMediaMention = async (token) => {
  try {
    let url = `socialMediaMention`;
    const { data } = await PROVIDER_GET(url, token);
    return data;
  } catch (error) {
    console.log("🚀 ~ getSocialMediaMention ~ error:", error);
    return [];
  }
};
