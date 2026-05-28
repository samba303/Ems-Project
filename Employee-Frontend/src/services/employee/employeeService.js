import axios from "../api/axiosConfig";

// Get all employees
export const getEmployees = () => {
    return axios.get("/employees");
};

// Delete employee
export const deleteEmployee = (id) => {
    return axios.delete(`/employees/${id}`);
};

// Update employee
export const updateEmployee = (id, data) => {
    return axios.put(`/employees/${id}`, data);
};