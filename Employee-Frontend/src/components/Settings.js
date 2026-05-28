import React, { useContext } from "react";

import Sidebar from "./Sidebar";

import { ThemeContext } from "../App";

function Settings() {

    // GLOBAL DARK MODE

    const { darkMode, setDarkMode } =
        useContext(ThemeContext);

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";
    };

    return (

        <div>

            <Sidebar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "30px",
                    minHeight: "100vh"
                }}
            >

                <h2 className="mb-4">
                    Settings
                </h2>

                {/* PROFILE CARD */}

                <div className="card shadow p-4 mb-4">

                    <div className="text-center">

                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=random"
                            alt="profile"
                            width="100"
                            height="100"
                            style={{
                                borderRadius: "50%"
                            }}
                        />

                        <h4 className="mt-3">
                            Admin User
                        </h4>

                        <p className="text-muted">
                            Employee Management System
                        </p>

                    </div>

                </div>

                {/* DARK MODE */}

                <div className="card shadow p-4 mb-4">

                    <h5>
                        Theme Settings
                    </h5>

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        className="btn btn-dark mt-3"
                    >
                        {darkMode
                            ? "Disable Dark Mode ☀️"
                            : "Enable Dark Mode 🌙"}
                    </button>

                </div>

                {/* CHANGE PASSWORD */}

                <div className="card shadow p-4 mb-4">

                    <h5 className="mb-3">
                        Change Password
                    </h5>

                    <input
                        type="password"
                        placeholder="Old Password"
                        className="form-control mb-3"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="form-control mb-3"
                    />

                    <button className="btn btn-primary">
                        Update Password
                    </button>

                </div>

                {/* LOGOUT */}

                <div className="card shadow p-4">

                    <h5 className="mb-3">
                        Account
                    </h5>

                    <button
                        onClick={handleLogout}
                        className="btn btn-danger"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Settings;