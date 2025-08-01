import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "withCredentials": true // automatically sends cookies with req
    }
});