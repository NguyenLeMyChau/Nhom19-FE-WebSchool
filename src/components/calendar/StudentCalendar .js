import React, { useEffect, useState } from 'react';
import './calendar.css'; // Import stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight, faPrint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StudentCalendar = () => {

    const handlePrint = () => {
        window.print();
    };

    const getStartOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Trường hợp đặc biệt khi ngày hiện tại là Chủ Nhật
        const startDate = new Date(date.setDate(diff));
        startDate.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00 để loại bỏ giờ phút giây
        return startDate;
    };

    const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


    const getWeekday = (date) => {
        const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return weekdays[date.getDay()];
    };

    const handleToday = () => {
        setCurrentDate(getStartOfWeek(new Date()));
    };

    const handleNextWeek = () => {
        const nextWeekDate = new Date(currentDate);
        nextWeekDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(getStartOfWeek(nextWeekDate));
    };

    const handlePreviousWeek = () => {
        const previousWeekDate = new Date(currentDate);
        previousWeekDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(getStartOfWeek(previousWeekDate));
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const weekday = getWeekday(date);
        return <>{weekday}<br />{day}/{month}/{year}</>;
    };

    const weekDaysTh = [...Array(7)].map((_, index) => {
        const currentDatePlusIndex = new Date(currentDate);
        currentDatePlusIndex.setDate(currentDate.getDate() + index);
        return (
            <th className='dayOfWeek' key={index}>
                {formatDate(currentDatePlusIndex)}
            </th>
        );
    });

    const handleDateChange = (event) => {
        const newDate = new Date(event.target.value);
        setCurrentDate(getStartOfWeek(newDate));
        setSelectedDate(event.target.value);
    };

    const [schedule, setSchedule] = useState([]);
    // const [studentId, setStudentId] = useState(null);
    // const [student, setStudent] = useState(null);


    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
            const studentData = JSON.parse(storedStudent);
            // setStudent(studentData);
            fetchScheduleData(studentData.id);
        }
    }, []);

    const fetchScheduleData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/${id}/schedule`);
            if (response.status === 200) {
                setSchedule(response.data.object);
                console.log(response.data.object);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };


    const isWithinDateRange = (date, startDate, endDate) => {
        const currentDate = new Date(date);
        return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
    };
    const renderScheduleItem = (shift) => {
        return (
            <tr key={shift}>
                <td className='study'>{shift}</td>
                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const dayDate = new Date(currentDate.getTime() + dayIndex * 86400000);
                    const weekday = getWeekday(dayDate);

                    return (
                        <td key={dayIndex}>
                            {schedule
                                .filter(item => item.dateOfWeek === weekday && isWithinDateRange(dayDate, item.startDate, item.endDate))
                                .map((item, index) => {
                                    const lessonParts = item.lesson.split('-');
                                    const lessonStart = parseInt(lessonParts[0]);
                                    const lessonEnd = parseInt(lessonParts[1]);

                                    const isMorning = lessonStart >= 1 && lessonEnd <= 6;
                                    const isAfternoon = lessonStart >= 7 && lessonEnd <= 12;
                                    const isEvening = lessonStart >= 13 && lessonEnd <= 18;

                                    if ((isMorning && shift === 'Sáng') || (isAfternoon && shift === 'Chiều') || (isEvening && shift === 'Tối')) {
                                        return (
                                            <div key={index} className='tbody-calendar'>
                                                <div className="lesson-calendar">
                                                    <p className='subject-calendar'>{item.subjectName}</p>
                                                    <p>{item.className} -</p>
                                                    <p>{item.classCode}</p>
                                                    <p>Tiết: {item.lesson}</p>
                                                    <p>Phòng: {item.classroom}</p>
                                                    <p>GV: {item.teacherName}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                        </td>
                    );
                })}
            </tr>
        );
    };

    return (
        <div className="student-calendar">
            <div className="calendar-header">
                <h4 className="page-title">Lịch học, lịch thi theo tuần</h4>
                <div className="calendar-actions">

                    <div className="radio-group">
                        <label className="radio-label">
                            <input id="rdoLoaiLich1" name="rdoLoaiLich" type="radio" value="0" />
                            <span className="radio-text" >Tất cả</span>
                        </label>
                        <label className="radio-label">
                            <input id="rdoLoaiLich2" name="rdoLoaiLich" type="radio" value="1" defaultChecked />
                            <span className="radio-text" >Lịch học</span>
                        </label>
                        <label className="radio-label">
                            <input id="rdoLoaiLich3" name="rdoLoaiLich" type="radio" value="2" />
                            <span className="radio-text" >Lịch thi</span>
                        </label>
                    </div>
                    <div className="date-picker">
                        {/* Trường nhập liệu ngày */}
                        {/* <input id="dateNgayXemLich" name="dateNgayXemLich" type="date" className="date-input" /> */}
                        <input
                            id="dateNgayXemLich"
                            name="dateNgayXemLich"
                            type="date"
                            className="date-input"
                            value={selectedDate}
                            onChange={handleDateChange} // Xử lý sự kiện thay đổi giá trị ngày
                        />
                    </div>
                    {/* Calendar navigation buttons */}
                    <button className='btn-hientai' onClick={handleToday}><FontAwesomeIcon icon={faCalendarDays} />Hiện tại</button>
                    <button className='btn-inlich' onClick={handlePrint}><FontAwesomeIcon icon={faPrint} />In lịch</button>
                    <button className='btn-trove' onClick={handlePreviousWeek}><FontAwesomeIcon icon={faChevronLeft} />Trở về</button>
                    <button className='btn-tieptuc' onClick={handleNextWeek}>Tiếp tục <FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
            <div className="calendar-body">
                <div className="table-responsive">
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th>Ca học</th>
                                {weekDaysTh}
                            </tr>
                        </thead>
                        <tbody>
                            {renderScheduleItem('Sáng')}
                            {renderScheduleItem('Chiều')}
                            {renderScheduleItem('Tối')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentCalendar;

