import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
 
export default function AdminDashboard() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");
    const [empId,setEmpId]=useState("");
    const [gender,setGender]=useState("");
    const [workLocation,setWorkLocation]=useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/app/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, description, email, mobile,dob, empId, doj,workLocation,gender})
            });
 
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
 
            const newDetail = await response.json();
            console.log(newDetail);
            setName("");
            setUsername("");
            setDescription("");
            setMobile("");
            setEmail("");
            setDob("");
            setDoj("");
            setEmpId("");
            setGender("");
            setWorkLocation("");
            alert("Employee details added!");
        } catch (error) {
            setError(`Error adding employee details: ${error.message}`);
        }
    };
    
 
    const navigateToUserDashboard = () => {
        navigate('/userdash1');
    };
 
    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    };
 
    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h3 className='heading'>User Dashboard</h3>
            </header>
            <div className="form-container">
                <form className="admin-form" onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <h3>User Profile Form</h3>
                    <label className='admin-label' htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
 
                    <label className='admin-label' htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label className='admin-label' htmlFor="gender">Gender:</label>
                    <input
                        id="gender"
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        placeholder='Male / Female / No mention'
                    />

                    <label className='admin-label' htmlFor="dob">Date of Birth:</label>
                    <input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />

                    <label className='admin-label' htmlFor="empId">Employee Id:</label>
                    <input
                        id="empId"
                        type="text"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                        required
                    />

                    <label className='admin-label' htmlFor="doj">Date of Joining:</label>
                    <input
                        id="doj"
                        type="date"
                        value={doj}
                        onChange={(e) => setDoj(e.target.value)}
                        required
                    />

                    <label className='admin-label' htmlFor="workLocation">Work Location:</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        required
                    />

                    <label className='admin-label' htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                   
                    <label className='admin-label' htmlFor="mobile">Mobile:</label>
                    <input
                        id="mobile"
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
 
                    <label className='admin-label' htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button className="submit" type="submit">Add Details</button>
                </form>
                <div className='navigation'>
                    <button className="nav-button" onClick={navigateToUserDashboard}>
                        Go to User Dashboard
                    </button>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}