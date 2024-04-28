import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/home/home'
import Schedule from './screens/schedule/schedule';
import Login from './screens/login/login';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  )
}
export default App

