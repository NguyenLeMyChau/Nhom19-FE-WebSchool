import React from 'react';
import './schedule.css';
import Header from '../../components/header/header';

// import Login from '../login/login';
// import { Routes, Route } from 'react-router-dom'
import StudentCalendar from '../../components/calendar/StudentCalendar ';
// import AcademicResult from '../academicResult/academicResult';
import NavigationBar from '../../components/navbar/navbar';


function Schedule() {
  return (
    <div className="schedule-body">

      <Header />

      <div className='schedule-main'>
        <NavigationBar />
        <div className='schedule-content'>
          <StudentCalendar />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
