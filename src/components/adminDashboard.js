import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"; 

export default function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [designation, setDesignation] = useState("");
    const [reports_to, setReports_to] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/app/employees');
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeId = selectedEmployee;

        try {
            const response = await fetch(`http://localhost:3001/app/employees/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ designation, reports_to }) 
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
            setDesignation("");
            setReports_to("");
            setSelectedEmployee("");
            alert("Employee details updated!!");
        } catch (error) {
            console.error("Error updating employee:", error);
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
                <h3 className='heading'>Admin Dashboard</h3>
            </header>
            <div className="form-container">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h3>Update Employee Information</h3>
                    <label className='admin-label' htmlFor="employee">Employee:</label>
                    <select
                        id="employee"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        required
                    >
                        <option value="">Select an employee</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>

                    <label className='admin-label' htmlFor="designation">Designation:</label>
                    <input
                        id="designation"
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                    
                    <label className='admin-label' htmlFor='reports_to'>Reports to:</label>
                    <input
                        id="reports_to"
                        type="text"
                        value={reports_to}
                        onChange={(e) => setReports_to(e.target.value)}
                        required
                    />

                    <button className="submit" type="submit">Update</button>
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
