import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/home/home'
import Schedule from './screens/schedule/schedule';
import Login from './screens/login/login';
import AcademicResult from './screens/academicResult/academicResult';
import RegisterCourse from './screens/registerCourse/registerCourse';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/AcademicResult" element={<AcademicResult />} />
        <Route path="/RegisterCourse" element={<RegisterCourse />} />
      </Routes>
    </Router>
  )
}
export default App

