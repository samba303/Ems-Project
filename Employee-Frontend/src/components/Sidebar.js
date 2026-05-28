import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuStyle = (path) => ({
        color: "white",
        textDecoration: "none",
        display: "block",
        padding: "12px",
        borderRadius: "8px",
        background:
            location.pathname === path
                ? "#0d6efd"
                : "transparent",
        transition: "0.3s"
    });

    return (

        <div
            style={{
                width: "240px",
                height: "100vh",
                overflowY: "auto",
                background: "#1e293b",
                color: "white",
                padding: "20px",
                position: "fixed",
                left: "0",
                top: "0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
            }}
        >

            {/* TOP SECTION */}

            <div>

                <h2
                    style={{
                        marginBottom: "35px",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}
                >
                    EMS
                </h2>

                <ul
                    style={{
                        listStyle: "none",
                        padding: "0"
                    }}
                >

                    <li style={{ marginBottom: "15px" }}>
                        <Link
                            to="/dashboard"
                            style={menuStyle("/dashboard")}
                        >
                            📊 Dashboard
                        </Link>
                    </li>

                    <li style={{ marginBottom: "15px" }}>
                        <Link
                            to="/employees"
                            style={menuStyle("/employees")}
                        >
                            👨‍💼 Employees
                        </Link>
                    </li>

                    <li style={{ marginBottom: "15px" }}>
                        <Link
                            to="/analytics"
                            style={menuStyle("/analytics")}
                        >
                            📈 Analytics
                        </Link>
                    </li>

                    <li style={{ marginBottom: "15px" }}>
                        <Link
                            to="/settings"
                            style={menuStyle("/settings")}
                        >
                            ⚙️ Settings
                        </Link>
                    </li>

                </ul>

            </div>

            {/* BOTTOM SECTION */}

            <div
                className="text-center"
                style={{
                    borderTop: "1px solid gray",
                    paddingTop: "15px"
                }}
            >

                <h6 className="text-white">
                    Developed By Shiva
                </h6>

                <small style={{ color: "#cbd5e1" }}>
                    Employee Management System
                </small>

            </div>

        </div>
    );
}

export default Sidebar;