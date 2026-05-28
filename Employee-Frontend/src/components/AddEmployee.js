import React, { useEffect, useState } from "react";
import axios from "axios";

function AddEmployee({ token, refreshEmployees }) {

    const [departments, setDepartments] = useState([]);

    const [employee, setEmployee] = useState({
        name: "",
        sal: "",
        mob_num: "",
        email: "",
        departmentId: ""
    });

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // ================= LOAD DEPARTMENTS =================

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8088/api/departments/all",
                { headers }
            );

            setDepartments(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    // ================= HANDLE SUBMIT =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {

            name: employee.name,

            sal: employee.sal,

            mob_num: employee.mob_num,

            email: employee.email,

            department: {
                id: Number(employee.departmentId)
            }
        };

        try {

            await axios.post(
                "http://localhost:8088/employees",
                payload,
                { headers }
            );

            alert("Employee Added Successfully");

            setEmployee({
                name: "",
                sal: "",
                mob_num: "",
                email: "",
                departmentId: ""
            });

            refreshEmployees();

        } catch (err) {

            console.log(err);

            alert("Error Adding Employee");
        }
    };

    return (

        <div className="card p-4 shadow">

            <h3 className="mb-3 text-primary">
                Add Employee
            </h3>

            <form onSubmit={handleSubmit}>

                {/* NAME */}

                <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    className="form-control mb-3"
                    value={employee.name}
                    onChange={handleChange}
                />

                {/* EMAIL */}

                <input
                    type="email"
                    name="email"
                    placeholder="Employee Email"
                    className="form-control mb-3"
                    value={employee.email}
                    onChange={handleChange}
                />

                {/* DEPARTMENT */}

                <select
                    name="departmentId"
                    className="form-control mb-3"
                    value={employee.departmentId}
                    onChange={handleChange}
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

                {/* SALARY */}

                <input
                    type="number"
                    name="sal"
                    placeholder="Salary"
                    className="form-control mb-3"
                    value={employee.sal}
                    onChange={handleChange}
                />

                {/* MOBILE */}

                <input
                    type="text"
                    name="mob_num"
                    placeholder="Mobile Number"
                    className="form-control mb-3"
                    value={employee.mob_num}
                    onChange={handleChange}
                />

                {/* BUTTON */}

                <button className="btn btn-primary">
                    Add Employee
                </button>

            </form>

        </div>
    );
}

export default AddEmployee;