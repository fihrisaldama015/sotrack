// import { getCookie } from "cookies-next";
import { PROVIDER_GET } from "../provider";

export const getAllCategory = async (accessToken) => {
  // const accessToken = getCookie("accessToken");
  const response = await PROVIDER_GET(`category`, accessToken);
  return response;
};
