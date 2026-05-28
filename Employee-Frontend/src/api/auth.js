import axios from "axios";

const BASE_URL = "http://localhost:8088";

export const loginUser = (data) => {
    return axios.post(`${BASE_URL}/auth/login`, data);
};

export const getEmployees = (token) => {
    return axios.get(`${BASE_URL}/employees`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};