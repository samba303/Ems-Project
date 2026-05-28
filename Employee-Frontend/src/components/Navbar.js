import React from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {

    const token = localStorage.getItem("token");

    let username = "User";

    if (token) {

        const decoded = jwtDecode(token);

        username = decoded.sub;
    }

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";
    };

    // DATE
    const today = new Date().toLocaleDateString();

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 sticky-top"
        >

            {/* LEFT SIDE */}
            <div className="d-flex align-items-center">

                <h4 className="text-white mb-0 fw-bold">
                    EMS Dashboard
                </h4>

            </div>

            {/* RIGHT SIDE */}
            <div className="ms-auto d-flex align-items-center">

                {/* DATE */}
                <span className="text-light me-4">
                    📅 {today}
                </span>

                {/* USER */}
                <div className="d-flex align-items-center me-4">

                    <img
                        src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                        alt="profile"
                        width="40"
                        height="40"
                        style={{
                            borderRadius: "50%",
                            marginRight: "10px"
                        }}
                    />

                    <span className="text-white fw-semibold">
                        Welcome, {username}
                    </span>

                </div>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;