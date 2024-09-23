import React, { useState } from "react";
import "../App.css";
import {  useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reports_to,setReport]=useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, designation, username, password,reports_to }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful");
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Error registering. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="container">
                <div className="login_1">
                    <h3>Welcome !!</h3>
                    <p>Register Yourself</p>
                </div>
                <div className="userform">
                    <h3>Registration Form</h3>
                    {error && <p className="error">{error}</p>}
                    <label htmlFor="name" className="register_label">Name</label>
                    <input
                        id="name"
                        className="register_input"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="designation" className="register_label">Designation</label>
                    <input
                        id="designation"
                        className="register_input"
                        type="text"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                    <label htmlFor="username" className="register_label">Username</label>
                    <input
                        id="username"
                        className="register_input"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password" className="register_label">Password</label>
                    <input
                        id="password"
                        className="register_input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="reports_to" className="register_label">Reporting to</label>
                    <input
                        id="reports_to"
                        className="register_input"
                        type="text"
                        placeholder="Enter reporting head"
                        value={reports_to}
                        onChange={(e) => setReport(e.target.value)}
                    />
                    <button className="submit" type="button" onClick={handleRegister} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </div>
        </section>
    );
}
