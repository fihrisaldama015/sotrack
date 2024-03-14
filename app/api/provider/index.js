import { BASE_URL } from "@/app/utils/constants";
import axios from "axios";

export const PROVIDER_GET = async (pathUrl, token = "") => {
  const headers = {
    "Content-Type": "application/json",
    // 'ADS-Key':ADS_KEY
    Authorization: `Bearer ${token}`,
  };
  const response = await axios
    .get(`${BASE_URL}/${pathUrl}`, { headers })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        case 403:
          throw "forbidden";
        default:
          console.log("error");
          break;
      }
    })
    .catch((err) => {
      throw err;
    });

  return response;
};

export const PROVIDER_POST = async (pathUrl, data, token = "") => {
  const headers = {
    "Content-Type": "application/json",
    // 'ADS-Key':ADS_KEY
    Authorization: `Bearer ${token}`,
  };

  const response = await axios
    .post(`${BASE_URL}/${pathUrl}`, data, { headers })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        default:
          console.log("error");
          break;
      }
    })
    .catch((err) => {
      switch (err.response.status) {
        case 400:
          throw err.response.data;
        case 401:
          throw err.response.data;
        case 403:
          throw "forbidden";
        case 404:
          throw err.response.data;
        default:
          console.log("error");
          break;
      }
    });

  return response;
};

export const PROVIDER_DELETE = async (pathUrl, data, token) => {
  const headers = {
    "Content-Type": "application/json",
    // 'ADS-Key':ADS_KEY
    Authorization: `Bearer ${token}`,
  };

  const response = await axios
    .delete(`${BASE_URL}/${pathUrl}`, { headers })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        default:
          console.log("error");
          break;
      }
    })
    .catch((err) => {
      switch (err.response.status) {
        case 401:
          throw err.response.data;
        case 403:
          throw "forbidden";
        case 404:
          throw err.response.data;
        default:
          console.log("error");
          throw err.response.data;
          break;
      }
    });

  return response;
};

export const PROVIDER_PUT = async (pathUrl, data, token = "") => {
  const headers = {
    "Content-Type": "application/json",
    // 'ADS-Key':ADS_KEY
    Authorization: `Bearer ${token}`,
  };

  const response = await axios
    .put(`${BASE_URL}/${pathUrl}`, data, { headers })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        default:
          console.log("error");
          break;
      }
    })
    .catch((err) => {
      switch (err.response.status) {
        case 400:
          throw err.response.data;
        case 401:
          throw err.response.data;
        case 403:
          throw "forbidden";
        case 404:
          throw err.response.data;
        default:
          console.log("error");
          break;
      }
    });

  return response;
};

export const PROVIDER_PUT_WITH_PARAMS = async (pathUrl, data, params) => {
  const headers = {
    "Content-Type": "application/json",
    // 'ADS-Key':ADS_KEY
  };

  const parsedParams = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const response = await axios
    .put(`${BASE_URL}/${pathUrl}?${parsedParams}`, data, { headers })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.data;
        case 201:
          return res.data;
        default:
          console.log("error");
          break;
      }
    })
    .catch((err) => {
      switch (err.response.status) {
        case 400:
          throw err.response.data;
        case 401:
          throw err.response.data;
        case 403:
          throw "forbidden";
        case 404:
          throw err.response.data;
        default:
          console.log("error");
          break;
      }
    });

  return response;
};
