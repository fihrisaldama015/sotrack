import {
  PROVIDER_DELETE,
  PROVIDER_GET,
  PROVIDER_POST,
  PROVIDER_PUT,
} from "../provider";

export const getAllFilterByPlatformId = async (platformId, token) => {
  try {
    const response = await PROVIDER_GET(`filter?platform=${platformId}`, token);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAllFilterByPlatformId ~ error:", error);
  }
};

export const getUserFilterByPlatformId = async (platformId, token) => {
  try {
    const response = await PROVIDER_GET(
      `filter-user?platform=${platformId}`,
      token
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getUserFilterByPlatformId ~ error:", error);
  }
};

export const getUserFilterDetail = async (platformId, filterId, token) => {
  try {
    const response = await PROVIDER_GET(
      `filter-user?platform=${platformId}&id=${filterId}`,
      token
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getUserFilterDetail ~ error:", error);
  }
};

export const addFilter = async (data, token) => {
  const response = await PROVIDER_POST("filter-user", data, token);
  return response;
};

export const deleteFilter = async (id, token) => {
  const response = await PROVIDER_DELETE(`filter-user/${id}`, null, token);
  return response;
};

export const editUserFilter = async (id, data, token) => {
  const response = await PROVIDER_PUT(`filter-user/${id}`, data, token);
  return response;
};
