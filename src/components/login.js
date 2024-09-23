import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username",username);
                alert("Login successful");
                if(username==="admin"){
                    navigate('/admindash');
                }
                else{
                    navigate('/userdash1');
                }
            } else {
                setError(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setError("Error logging in. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="container">
                <div className="login_1">
                    <h3>Welcome !!</h3>
                    <Link to={'/register'}>
                        <p>Create new account</p>
                    </Link>
                </div>
                <div className="userform">
                    <h3>User Login</h3>
                    {error && <p className="error">{error}</p>}
                    <input
                        className="login_input"
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login_input"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="submit" type="button" onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </div>
        </section>
    );
}
