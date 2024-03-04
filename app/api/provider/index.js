import { BASE_URL } from "@/app/utils/constants";
import axios from "axios";

export const PROVIDER_GET = async (pathUrl) => {
    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }
    const response = await axios.get(`${BASE_URL}/${pathUrl}`, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                case 403:
                    throw "forbidden"
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            throw err
        })

    return response
}

export const PROVIDER_POST = async (pathUrl, data) => {

    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    const response = await axios.post(`${BASE_URL}/${pathUrl}`, data, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            switch (err.response.status) {
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response

}

export const PROVIDER_DELETE = async (pathUrl, data) => {

    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    const response = await axios.delete(`${BASE_URL}/${pathUrl}`, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            switch (err.response.status) {
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response

}

export const PROVIDER_PUT = async (pathUrl, data) => {

    const headers = {
        'Content-Type': 'application/json',
        // 'ADS-Key':ADS_KEY
    }

    const response = await axios.put(`${BASE_URL}/${pathUrl}`, data, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            switch (err.response.status) {
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response

}

