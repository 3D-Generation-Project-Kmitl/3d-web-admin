import axios from "axios";

const httpClient = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 20000,
});

export default httpClient;