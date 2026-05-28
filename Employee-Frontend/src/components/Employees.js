import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddEmployee from "./AddEmployee";

const BASE_URL = "http://localhost:8088";

function Employees() {

    const token = localStorage.getItem("token");

    const decoded = token ? jwtDecode(token) : null;

    const role = decoded?.role || "";

    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");

    const [darkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const [employee, setEmployee] = useState({
        name: "",
        sal: "",
        mob_num: "",
        email: ""
    });

    const [departmentId, setDepartmentId] = useState("");

    const [editId, setEditId] = useState(null);

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // ================= LOAD EMPLOYEES =================

    const loadEmployees = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/employees/pagination?page=${page}&size=5&sortBy=id`,
                { headers }
            );

            setEmployees(res.data.content);
            setAllEmployees(res.data.content);

            setTotalPages(res.data.totalPages);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load employees");
        }
    };

    // ================= LOAD DEPARTMENTS =================

    const loadDepartments = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/api/departments/all`,
                { headers }
            );

            setDepartments(res.data);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load departments");
        }
    };

    // ================= USE EFFECT =================

    useEffect(() => {

        if (token) {

            loadEmployees();
            loadDepartments();
        }

    }, [page, token]);

    // ================= ADD / UPDATE =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {
            name: employee.name,
            sal: employee.sal,
            mob_num: employee.mob_num,
            email: employee.email,
            department: {
                id: Number(departmentId)
            }
        };

        try {

            if (editId) {

                await axios.put(
                    `${BASE_URL}/employees/${editId}`,
                    payload,
                    { headers }
                );

                toast.success("Employee Updated");

            } else {

                await axios.post(
                    `${BASE_URL}/employees`,
                    payload,
                    { headers }
                );

                toast.success("Employee Added");
            }

            setEmployee({
                name: "",
                sal: "",
                mob_num: "",
                email: ""
            });

            setDepartmentId("");

            setEditId(null);

            loadEmployees();

        } catch (err) {

            console.log(err);

            toast.error("Operation Failed");
        }
    };

    // ================= EDIT =================

    const handleEdit = (emp) => {

        setEmployee({
            name: emp.name,
            sal: emp.sal,
            mob_num: emp.mob_num,
            email: emp.email
        });

        setDepartmentId(emp.department?.id || "");

        setEditId(emp.id);
    };

    // ================= DELETE =================

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure?")) return;

        try {

            await axios.delete(
                `${BASE_URL}/employees/${id}`,
                { headers }
            );

            toast.success("Deleted Successfully");

            loadEmployees();

        } catch (err) {

            console.log(err);

            toast.error("Delete Failed");
        }
    };

    // ================= SEARCH =================

    const handleSearch = () => {

        if (!search) {

            setEmployees(allEmployees);

            return;
        }

        const filtered = allEmployees.filter((emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase())
        );

        setEmployees(filtered);
    };

    // ================= RESET =================

    const handleReset = () => {

        setSearch("");

        setEmployees(allEmployees);
    };

    return (

        <div>

            <Sidebar />
            <Navbar />

            <div
                className="container-fluid mt-4"
                style={{
                    marginLeft: "240px",
                    width: "calc(100% - 240px)",
                    paddingRight: "30px",
                    minHeight: "100vh",
                    backgroundColor: darkMode
                        ? "#0f172a"
                        : "#f8fafc",
                    color: darkMode
                        ? "white"
                        : "black"
                }}
            >

                <h2 className="text-primary mb-4">
                    Employee Management
                </h2>

                {/* ================= ADD EMPLOYEE ================= */}

                {role === "ROLE_USER" && (
                    <AddEmployee
                        token={token}
                        refreshEmployees={loadEmployees}
                    />
                )}

                {/* ================= UPDATE FORM ================= */}

                {editId && role === "ROLE_USER" && (

                    <form
                        className="card p-4 shadow mb-4"
                        onSubmit={handleSubmit}
                        style={{
                            backgroundColor: darkMode
                                ? "#1e293b"
                                : "white",
                            color: darkMode
                                ? "white"
                                : "black"
                        }}
                    >

                        <h4 className="mb-3">
                            Update Employee
                        </h4>

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Employee Name"
                            value={employee.name}
                            onChange={(e) =>
                                setEmployee({
                                    ...employee,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Employee Email"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({
                                    ...employee,
                                    email: e.target.value
                                })
                            }
                        />

                        <select
                            className="form-control mb-3"
                            value={departmentId}
                            onChange={(e) =>
                                setDepartmentId(e.target.value)
                            }
                        >

                            <option value="">
                                Select Department
                            </option>

                            {departments.map((d) => (

                                <option
                                    key={d.id}
                                    value={d.id}
                                >
                                    {d.name}
                                </option>

                            ))}

                        </select>

                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Salary"
                            value={employee.sal}
                            onChange={(e) =>
                                setEmployee({
                                    ...employee,
                                    sal: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Mobile Number"
                            value={employee.mob_num}
                            onChange={(e) =>
                                setEmployee({
                                    ...employee,
                                    mob_num: e.target.value
                                })
                            }
                        />

                        <button className="btn btn-warning">
                            Update Employee
                        </button>

                    </form>
                )}

                {/* ================= SEARCH ================= */}

                <div
                    className="card shadow p-3 mb-4"
                    style={{
                        backgroundColor: darkMode
                            ? "#1e293b"
                            : "white",
                        color: darkMode
                            ? "white"
                            : "black"
                    }}
                >

                    <h5 className="mb-3">
                        Search Employee
                    </h5>

                    <div className="row align-items-center">

                        <div className="col-md-8">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Employee By Name"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-4 mt-3 mt-md-0">

                            <button
                                onClick={handleSearch}
                                className="btn btn-success me-2"
                            >
                                Search
                            </button>

                            <button
                                onClick={handleReset}
                                className="btn btn-secondary"
                            >
                                Reset
                            </button>

                        </div>

                    </div>

                </div>

                {/* ================= TABLE ================= */}

<div
    className="table-responsive"
    style={{
        borderRadius: "10px",
        overflow: "hidden"
    }}
>

    <table
        className="table table-bordered shadow"
        style={{
            backgroundColor: darkMode
                ? "#1e293b"
                : "white",
            color: darkMode
                ? "white"
                : "black"
        }}
    >

        <thead
            style={{
                backgroundColor: darkMode
                    ? "#0f172a"
                    : "#0d6efd",
                color: "white"
            }}
        >

            <tr>

                {role === "ROLE_USER" && (
                    <th>Action</th>
                )}

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Mobile</th>

            </tr>

        </thead>

        <tbody>

            {employees.length > 0 ? (

                employees.map((emp) => (

                    <tr
                        key={emp.id}
                        style={{
                            backgroundColor: darkMode
                                ? "#334155"
                                : "white",
                            color: darkMode
                                ? "white"
                                : "black"
                        }}
                    >

                        {role === "ROLE_USER" && (

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(emp)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(emp.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        )}

                        <td>{emp.id}</td>

                        <td>{emp.name}</td>

                        <td>{emp.email}</td>

                        <td>
                            {emp.department?.name || "N/A"}
                        </td>

                        <td>{emp.sal}</td>

                        <td>{emp.mob_num}</td>

                    </tr>

                ))

            ) : (

                <tr
                    style={{
                        backgroundColor: darkMode
                            ? "#334155"
                            : "white",
                        color: darkMode
                            ? "white"
                            : "black"
                    }}
                >

                    <td
                        colSpan="7"
                        className="text-center"
                    >
                        No Employees Found
                    </td>

                </tr>

            )}

        </tbody>

    </table>

</div>



                {/* ================= PAGINATION ================= */}

                <div className="text-center mt-4">

                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                        className="btn btn-primary me-2"
                    >
                        Prev
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, i) => (

                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`btn mx-1 ${
                                    page === i
                                        ? "btn-dark"
                                        : "btn-outline-primary"
                                }`}
                            >
                                {i + 1}
                            </button>

                        )
                    )}

                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => setPage(page + 1)}
                        className="btn btn-primary ms-2"
                    >
                        Next
                    </button>

                </div>

                <ToastContainer />

            </div>

        </div>
    );
}

export default Employees;