import axios from "../api/axiosConfig";

export const login = (data) => {
    return axios.post("/auth/login", data);
};

export const register = (data) => {
    return axios.post("/auth/register", data);
};