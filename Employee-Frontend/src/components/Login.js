import React, { useState } from "react";
import "./Login.css";

import {
    FaUserShield,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Login() {

    // STATES

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [forgotMode, setForgotMode] =
        useState(false);

    const [newPassword, setNewPassword] =
        useState("");

    // LOGIN FUNCTION

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8088/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data =
                await response.text();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data
                );

                alert("Login Success");

                window.location.href =
                    "/dashboard";

            } else {

                alert("Login Failed");
            }

        } catch (error) {

            console.log(error);

            alert("Server Error");
        }
    };

    // FORGOT PASSWORD FUNCTION

    const handleForgotPassword =
        async () => {

        try {

            const response = await fetch(
                `http://localhost:8088/auth/forgot-password?username=${username}&newPassword=${newPassword}`,
                {
                    method: "POST"
                }
            );

            const data =
                await response.text();

            alert(data);

            setForgotMode(false);

            setNewPassword("");

        } catch (error) {

            console.log(error);

            alert(
                "Error updating password"
            );
        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                {/* LOGO */}

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <FaUserShield
                        size={55}
                        color="white"
                    />

                    <h2
                        style={{
                            marginTop: "10px",
                            color: "white"
                        }}
                    >
                        EMS Portal
                    </h2>

                    <p
                        style={{
                            color: "#e2e8f0",
                            fontSize: "14px"
                        }}
                    >
                        Employee Management System
                    </p>

                </div>

                <p style={{ color: "white" }}>
                    Login to continue
                </p>

                {/* FORM */}

                <form onSubmit={handleLogin}>

                    {/* USERNAME */}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />

                    {/* PASSWORD */}

                    <div
                        style={{
                            position: "relative"
                        }}
                    >

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <span
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                cursor: "pointer",
                                color: "#555"
                            }}
                        >

                            {showPassword
                                ? <FaEyeSlash />
                                : <FaEye />}

                        </span>

                    </div>

                    {/* LOGIN BUTTON */}

                    <button type="submit">
                        Login
                    </button>

                    {/* FORGOT PASSWORD */}

                    <p
                        onClick={() =>
                            setForgotMode(
                                !forgotMode
                            )
                        }
                        style={{
                            color: "white",
                            cursor: "pointer",
                            marginTop: "15px"
                        }}
                    >
                        Forgot Password?
                    </p>

                    {/* NEW PASSWORD SECTION */}

                    {forgotMode && (

                        <>

                            <input
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={
                                    handleForgotPassword
                                }
                            >
                                Update Password
                            </button>

                        </>
                    )}

                </form>

                {/* FOOTER */}

                <p
                    className="text-center mt-4"
                    style={{
                        color: "#cbd5e1",
                        fontSize: "14px"
                    }}
                >
                    Developed By Shiva
                </p>

            </div>

        </div>
    );
}

export default Login;