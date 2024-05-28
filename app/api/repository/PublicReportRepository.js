import dayjs from "dayjs";
import { PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider";

export const getLinkForm = async (token) => {
  try {
    const { data } = await PROVIDER_GET("report/getLinkForm", token);
    return data;
  } catch (error) {
    console.log("🚀 ~ getLinkForm ~ error:", error);
    return "";
  }
};

export const getAllReport = async (startDate, endDate, token) => {
  try {
    let url = `report/getAllReport?since=${startDate}&until=${endDate}`;
    const { data } = await PROVIDER_GET(url, token);
    let response = [];
    data.map((item) => {
      response.push({
        id: item.id,
        date: dayjs(item.createdAt).format("MMM DD, YYYY"),
        name: item.name,
        city: item.city,
        message: item.message,
        ditangani: item.is_handled,
      });
    });
    return response;
  } catch (error) {
    console.log("🚀 ~ getAllReport ~ error:", error);
    return [];
  }
};

export const getReportDetail = async (id) => {
  try {
    const { data } = await PROVIDER_GET(`report/getReport/${id}`);
    return data;
  } catch (error) {
    console.log("🚀 ~ getReportDetail ~ error:", error);
    return [];
  }
};

export const sendPublicReport = async (data, id, token) => {
  try {
    const response = await PROVIDER_POST(`report/addReport/${id}`, data, token);
    return response;
  } catch (e) {
    console.log("🚀 ~ sendPublicReport ~ e:", e);
    return [];
  }
};

export const getProvince = async () => {
  try {
    const { data } = await PROVIDER_GET("report/getProvince");
    return data;
  } catch (e) {
    console.log("🚀 ~ getProvince ~ e:", e);
    return [];
  }
};

export const getCity = async (province_id) => {
  try {
    const { data } = await PROVIDER_GET(
      `report/getCity?province_id=${province_id}`
    );
    return data;
  } catch (error) {
    console.log("🚀 ~ getCity ~ error:", error);
    return [];
  }
};

export const getCategory = async () => {
  try {
    const { data } = await PROVIDER_GET("report/getAllCategory");
    return data;
  } catch (error) {
    console.log("🚀 ~ getCategory ~ error:", error);
    return [];
  }
};

export const handleReport = async (id) => {
  try {
    const { data } = await PROVIDER_PUT(`report/isHandled/${id}`);
    return data;
  } catch (error) {
    console.log("🚀 ~ handleReport ~ error:", error);
    return [];
  }
};
