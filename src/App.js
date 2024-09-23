import './App.css';
import Login from './components/login';
import Register from './components/register';
import AdminDashboard from './components/adminDashboard';
import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserDashboard1 from './components/userDashboard1';
import ProfileDashboard from './components/profileModify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/userdash1' element={<UserDashboard1/>}></Route>
        <Route path='/admindash' element={<AdminDashboard/>}></Route>
        <Route path='/profile' element={<ProfileDashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
