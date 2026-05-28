import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

function Analytics() {

    const [chartData, setChartData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [totalEmployees, setTotalEmployees] = useState(0);

    const [totalDepartments, setTotalDepartments] = useState(0);

    const token = localStorage.getItem("token");

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF"
    ];

    useEffect(() => {

        loadAnalytics();

    }, [token]);

    const loadAnalytics = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8088/employees",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const employees = response.data;

            setTotalEmployees(employees.length);

            // ================= DEPARTMENT COUNT =================

            const deptCount = {};

            employees.forEach((emp) => {

                const dept =
                    emp.department?.name || "Unknown";

                if (deptCount[dept]) {

                    deptCount[dept]++;

                } else {

                    deptCount[dept] = 1;
                }

            });

            // ================= FORMAT DATA =================

            const formattedData = Object.keys(deptCount).map(
                (dept) => ({
                    department: dept,
                    employees: deptCount[dept]
                })
            );

            setChartData(formattedData);

            setTotalDepartments(
                Object.keys(deptCount).length
            );

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);
        }
    };

    return (

        <div>

            <Sidebar />
            <Navbar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "30px"
                }}
            >

                <h2 className="mb-4 text-primary">
                    Analytics Dashboard
                </h2>

                {/* ================= STATS ================= */}

                <div className="row mb-4">

                    <div className="col-md-6">

                        <div className="card shadow p-4 bg-primary text-white">

                            <h4>Total Employees</h4>

                            <h2>{totalEmployees}</h2>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="card shadow p-4 bg-success text-white">

                            <h4>Total Departments</h4>

                            <h2>{totalDepartments}</h2>

                        </div>

                    </div>

                </div>

                {/* ================= BAR CHART ================= */}

                <div className="card shadow p-4 mb-5">

                    <h4 className="mb-4">
                        Department Wise Employees
                    </h4>

                    {loading ? (

                        <h5>Loading Analytics...</h5>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height={400}
                        >

                            <BarChart data={chartData}>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis dataKey="department" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="employees"
                                    fill="#0d6efd"
                                    radius={[10, 10, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    )}

                </div>

                {/* ================= PIE CHART ================= */}

                <div className="card shadow p-4">

                    <h4 className="mb-4">
                        Department Distribution
                    </h4>

                    <div className="d-flex justify-content-center">

                        <PieChart width={500} height={400}>

                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={140}
                                dataKey="employees"
                                nameKey="department"
                                label
                            >

                                {chartData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />

                                ))}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Analytics;