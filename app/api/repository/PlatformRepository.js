import { PROVIDER_GET } from "../provider";

export const getAllPlatform = async (token) => {
  try {
    const response = await PROVIDER_GET(`platform`, token);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ SettingLayout ~ error:", error);
  }
};
