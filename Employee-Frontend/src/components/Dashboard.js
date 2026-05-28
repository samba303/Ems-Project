import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const token = localStorage.getItem("token");

    let role = "";

    let username = "";

    if (token) {

        const decoded = jwtDecode(token);

        role = decoded.role;

        username = decoded.sub;
    }

    const [employeeCount, setEmployeeCount] = useState(0);

    const [departmentCount, setDepartmentCount] = useState(0);

    const [roleData, setRoleData] = useState([]);

    const BASE_URL = "http://localhost:8088";

    const COLORS = [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6610f2"
    ];

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // DATE

    const today = new Date().toLocaleDateString();

    // LOAD DASHBOARD DATA

    useEffect(() => {

        if (!token) return;

        axios.get(
            `${BASE_URL}/api/dashboard/employee-count`,
            { headers }
        )
        .then(res => setEmployeeCount(res.data))
        .catch(err => console.log(err));

        axios.get(
            `${BASE_URL}/api/departments/count`,
            { headers }
        )
        .then(res => setDepartmentCount(res.data))
        .catch(err => console.log(err));

        axios.get(
            `${BASE_URL}/api/dashboard/dept-count`,
            { headers }
        )
        .then(res => {

            const data = res.data || {};

            setRoleData(

                Object.entries(data).map(([k, v]) => ({

                    name: k,

                    value: v

                }))
            );

        })
        .catch(err => console.log(err));

    }, [token]);

    return (

        <div>

            <Sidebar />

            <Navbar />

            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    padding: "30px",
                    background: "#f1f5f9",
                    minHeight: "100vh"
                }}
            >

                {/* HEADER */}

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <div>

                        <h2 className="fw-bold text-dark">
                            Dashboard Overview
                        </h2>

                        <p className="text-muted">
                            Welcome back, {username}
                        </p>

                    </div>

                    <div
                        className="bg-white shadow-sm rounded p-3"
                    >

                        <h6 className="mb-0">
                            📅 {today}
                        </h6>

                    </div>

                </div>

                {/* WELCOME CARD */}

                <div
                    className="card border-0 shadow-sm p-4 mb-4"
                    style={{
                        borderRadius: "15px"
                    }}
                >

                    <h3 className="text-primary fw-bold">
                        Welcome to EMS Dashboard
                    </h3>

                    <p className="text-muted">
                        Manage employees, analytics,
                        departments and settings easily.
                    </p>

                    <div className="mt-3">

                        <span className="badge bg-success p-2">
                            Logged in as {role}
                        </span>

                    </div>

                </div>

                {/* STATS CARDS */}

                <div className="row">

                    {/* EMPLOYEES */}

                    <div className="col-md-4 mb-4">

                        <div
                            className="card border-0 shadow-sm p-4"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <h5 className="text-muted">
                                Total Employees
                            </h5>

                            <h1 className="fw-bold text-primary">
                                {employeeCount}
                            </h1>

                            <p className="text-success">
                                Active employees in system
                            </p>

                        </div>

                    </div>

                    {/* DEPARTMENTS */}

                    <div className="col-md-4 mb-4">

                        <div
                            className="card border-0 shadow-sm p-4"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <h5 className="text-muted">
                                Departments
                            </h5>

                            <h1 className="fw-bold text-success">
                                {departmentCount}
                            </h1>

                            <p className="text-primary">
                                Departments available
                            </p>

                        </div>

                    </div>

                    {/* ROLE */}

                    <div className="col-md-4 mb-4">

                        <div
                            className="card border-0 shadow-sm p-4"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <h5 className="text-muted">
                                User Role
                            </h5>

                            <h1 className="fw-bold text-dark">
                                {role}
                            </h1>

                            <p className="text-warning">
                                Access level granted
                            </p>

                        </div>

                    </div>

                </div>

                {/* ANALYTICS */}

                <div
                    className="card border-0 shadow-sm p-4"
                    style={{
                        borderRadius: "15px"
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h4 className="fw-bold">
                            Department Analytics
                        </h4>

                        <span className="badge bg-primary">
                            Live Data
                        </span>

                    </div>

                    {roleData.length > 0 ? (

                        <ResponsiveContainer
                            width="100%"
                            height={400}
                        >

                            <PieChart>

                                <Pie
                                    data={roleData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={140}
                                    dataKey="value"
                                    label
                                >

                                    {roleData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index %
                                                        COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    ) : (

                        <div
                            className="text-center text-muted p-5"
                        >

                            No Analytics Data Available

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;