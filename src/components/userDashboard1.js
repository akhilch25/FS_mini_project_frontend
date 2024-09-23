import React, { useState, useEffect } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import Modal from './modal';

export default function UserDashboard() {
    const [employees, setEmployees] = useState([]);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/app/employees');
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const employees = await response.json();
                setEmployees(employees);
            } catch (error) {
                setError(`Error fetching employees: ${error.message}`);
            }
            setLoading(false);
        };

        const fetchDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/app/details');
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const details = await response.json();
                setDetails(details);
            } catch (error) {
                setError(`Error fetching details: ${error.message}`);
            }
            setLoading(false);
        };

        fetchEmployees();
        fetchDetails();
    }, []);

    const groupByDesignation = (employees) => {
        const order = ['CEO', 'Manager', 'Sr. Software Engineer', 'Software Engineer'];
        const grouped = {};
        order.forEach(designation => {
            grouped[designation] = [];
        });
        employees.forEach(employee => {
            if (grouped[employee.designation]) {
                grouped[employee.designation].push(employee);
            }
        });

        return grouped;
    };

    const groupedEmployees = groupByDesignation(employees);

    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    };

    const handleProfileClick=()=>{
        navigate('/profile');
    }
    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const getEmployeeDetails = (username) => {
        return details.find(detail => detail.username === username) || {};
    };

    const employeeDetails = selectedEmployee ? getEmployeeDetails(selectedEmployee.username) : {};

    if (loading) {
        return (<div>Loading....</div>);
    }

    return (
        <div className="user-dashboard">
            <header className="user-header">
                <h3 className='heading'>User Dashboard</h3>
            </header>
            {error && <p className="error">{error}</p>}
            {Object.entries(groupedEmployees).map(([designation, emps]) => (
                <div key={designation} className="designation-group">
                    <div className="employee-row">
                        {emps.map(emp => (
                            <div key={emp.id} className="employee-card" onClick={() => handleEmployeeClick(emp)}>
                                <span className="employee-name">{emp.name}</span>
                                <span className="employee-designation">{emp.designation}</span>
                                <span className="employee-designation">Reports to: {emp.reports_to}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div>
                <button className='logout' onClick={handleLogout}>Logout</button>
                <button className='modify-button' onClick={handleProfileClick}>Modify your profile</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedEmployee && (
                    <div>
                        <img className="profile-image" src={employeeDetails.gender==="Male"? "Male.png" :employeeDetails.gender==="Female"?"Female.png":"User.png"} alt='No profile'/>
                        <h3>{selectedEmployee.name}</h3>
                        <p>{employeeDetails.gender}</p>
                        <p><span className='emp-desc'>Username: </span>{selectedEmployee.username}</p>
                        <p><span className='emp-desc'>Designation: </span>{selectedEmployee.designation}</p>
                        <p><span className='emp-desc'>Reports to: </span>{selectedEmployee.reports_to}</p>
                        <p><span className='emp-desc'>Date of Birth: </span>{employeeDetails.dob || 'Not yet updated!!'}</p>
                        <p><span className='emp-desc'>Date of Joining: </span>{employeeDetails.doj || 'Not yet updated!!'}</p>
                        <p><span className='emp-desc'>Work Location: </span>{employeeDetails.workLocation || 'Not yet updated!!'}</p>
                        <p><span className='emp-desc'>Mobile: </span>{employeeDetails.mobile || 'Not yet updated!!'}</p>
                        <p><span className='emp-desc'>Email: </span>{employeeDetails.email || 'Not yet updated!!'}</p>
                        <p><span className='emp-desc'>Description: </span>{employeeDetails.description || 'Not yet updated!!'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
