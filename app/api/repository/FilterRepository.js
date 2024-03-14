import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST } from "../provider";

export const getAllFilterByPlatformId = async (platformId, token) => {
  try {
    const response = await PROVIDER_GET(`filter?platform=${platformId}`, token);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAllFilterByPlatformId ~ error:", error);
  }
};

export const addFilter = async (data, token) => {
  const response = await PROVIDER_POST("filter", data, token);
  return response;
};

export const deleteFilter = async (id, token) => {
  const response = await PROVIDER_DELETE(`filter/${id}`, null, token);
  return response;
};
