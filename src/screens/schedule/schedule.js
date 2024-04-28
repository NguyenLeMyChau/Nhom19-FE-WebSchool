import React from 'react';
import NavigationBar from '../../components/navbar/navbar';
import './schedule.css';
import Header from '../../components/header/header';

import Login from '../login/login';
import { Routes, Route } from 'react-router-dom'
import StudentCalendar from '../../components/calendar/StudentCalendar ';


function Schedule() {
  return (
    <div className="schedule-body">

      <Header />
      <div className='schedule-main'>
        <NavigationBar className="navigation" />
        <div className='schedule-content'>
          <StudentCalendar />
        </div>
      </div>

      <Routes>
        <Route path="/thong-tin-chung" element={<Login />} />
        <Route path="/KetQuaHocTap" element={<Header />} />
        <Route path="/LichTheoTuan" element={<Login />} />
      </Routes>

    </div>
  );
}

export default Schedule;
