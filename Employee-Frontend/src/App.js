import React, { useState, createContext } from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

import ProtectedRoute from "./routes/ProtectedRoute";

// GLOBAL DARK MODE CONTEXT

export const ThemeContext = createContext();

function App() {

    const [darkMode, setDarkMode] = useState(false);

    return (

        <ThemeContext.Provider
            value={{ darkMode, setDarkMode }}
        >

            <div className={darkMode ? "dark-mode" : ""}>

                <BrowserRouter>

                    <Routes>

                        {/* PUBLIC ROUTE */}

                        <Route
                            path="/"
                            element={<Login />}
                        />

                        {/* PROTECTED ROUTES */}

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/employees"
                            element={
                                <ProtectedRoute>
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/analytics"
                            element={
                                <ProtectedRoute>
                                    <Analytics />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </BrowserRouter>

            </div>

        </ThemeContext.Provider>
    );
}

export default App;