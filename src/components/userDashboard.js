import React, { useState, useEffect } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
    const [selection, setSelection] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/app/employees');
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const employees = await response.json();
                setData(transformEmployeeData(employees));
            } catch (error) {
                setError(`Error fetching employees: ${error.message}`);
            }
            setLoading(false)
        };
        fetchEmployees();
    }, []);
    

    const transformEmployeeData = (employees) => {
        const ceo = employees.find(emp => emp.designation === "CEO");
        return [
            {
                expanded: true,
                type: 'person',
                data: ceo,
                children: employees.filter(emp => emp.designation === 'Manager').map(emp => ({
                    expanded: true,
                    type: 'person',
                    data: emp,
                    children:employees.filter(emp=>emp.designation==='Sr. Software Engineer').map(emp=>({
                        expanded:true,
                        type:'person',
                        data:emp,
                        children:employees.filter(emp=>emp.designation==='Software Engineer').map(emp=>({
                            expanded:true,
                            type:'person',
                            data:emp
                    }))
                }))
            }))
        }
        ];
    };
/*
*/ 
    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <span className="font-bold mb-2">{node.data.name}</span>
                        <span>{node.data.designation}</span>
                        <span>Reports to: {node.data.reports_to}</span>
                    </div>
                </div>
            );
        }

        return node.label;
    };
    
    const handleLogout=()=>{
        navigate('/login');
    }

    if(loading)
        return (<div>loading....</div>)
    return (
        <div className='user-dashboard'>
            <header className="user-header">
                <h3>User Dashboard</h3>
            </header>
            <div className="card overflow-x-auto">
                {error && <p className="error">{error}</p>}
                <OrganizationChart 
                    value={data} 
                    selectionMode="multiple" 
                    selection={selection} 
                    onSelectionChange={(e) => setSelection(e.data)} 
                    nodeTemplate={nodeTemplate} 
                />
            </div>
            <div>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
