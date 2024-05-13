import React, { useState } from 'react';
import './calendar.css'; // Import stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight, faPrint } from '@fortawesome/free-solid-svg-icons';

const StudentCalendar = () => {
    const getStartOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Trường hợp đặc biệt khi ngày hiện tại là Chủ Nhật
        const startDate = new Date(date.setDate(diff));
        startDate.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00 để loại bỏ giờ phút giây
        return startDate;
    };

    const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));

    // const data = [
    //     {
    //         "Tên môn": "Lập trình hướng đối tượng",
    //         "Tên lớp": "DHKTPM16A",
    //         "Mã môn": "737338484986",
    //         "lịch học": [
    //             { "islyThuyet": 0, "Tiết học": "1-3", "dayofweek": "Thứ 2" },
    //             { "islyThuyet": 1, "Tiết học": "1-3", "dayofweek": "Thứ 3" }
    //         ],
    //         "Giáo viên": "Nguyễn Văn A"
    //     },
    //     {
    //         "Tên môn": "Cơ sở dữ liệu",
    //         "Tên lớp": "DHKTPM16A",
    //         "Mã môn": "832948327944",
    //         "lịch học": [
    //             { "islyThuyet": 1, "Tiết học": "4-6", "dayofweek": "Thứ 4" },
    //             { "islyThuyet": 0, "Tiết học": "7-9", "dayofweek": "Thứ 5" }
    //         ],
    //         "Giáo viên": "Trần Thị B"
    //     },
    //     {
    //         "Tên môn": "Toán cao cấp",
    //         "Tên lớp": "DHKTPM16A",
    //         "Mã môn": "949592827111",
    //         "lịch học": [
    //             { "islyThuyet": 1, "Tiết học": "1-3", "dayofweek": "Thứ 6" },
    //             { "islyThuyet": 0, "Tiết học": "4-6", "dayofweek": "Thứ 7" }
    //         ],
    //         "Giáo viên": "Phạm Văn C"
    //     },
    //     {
    //         "Tên môn": "Toán cao cấp 2",
    //         "Tên lớp": "DHKTPM16A",
    //         "Mã môn": "949592827111",
    //         "lịch học": [
    //             { "islyThuyet": 1, "Tiết học": "1-3", "dayofweek": "Chủ nhật" },
    //             { "islyThuyet": 0, "Tiết học": "4-6", "dayofweek": "Chủ nhật" }
    //         ],
    //         "Giáo viên": "Phạm khkfhskf"
    //     },
    //     {
    //         "Tên môn": "Toán cao cấp 1",
    //         "Tên lớp": "DHKTPM16A",
    //         "Mã môn": "949592827111",
    //         "lịch học": [
    //             { "islyThuyet": 1, "Tiết học": "13-15", "dayofweek": "2024-04-27" },
    //             { "islyThuyet": 0, "Tiết học": "4-6", "dayofweek": "2024-04-27" }
    //         ],
    //         "Giáo viên": "Phạm khkfhskf"
    //     }
    // ];

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
                    {/* Các radio button */}
                    <div className="date-picker">
                        {/* Trường nhập liệu ngày */}
                        <input id="dateNgayXemLich" name="dateNgayXemLich" type="date" className="date-input" />
                    </div>
                    {/* Các nút khác */}
                    <button className='btn-hientai' onClick={handleToday}><FontAwesomeIcon icon={faCalendarDays} />Hiện tại</button>
                    <button className='btn-inlich'><FontAwesomeIcon icon={faPrint} />In lịch</button>
                    {/* Nút "Trở về" */}
                    <button className='btn-trove' onClick={handlePreviousWeek}><FontAwesomeIcon icon={faChevronLeft} />Trở về</button>
                    {/* Nút "Tiếp tục" */}
                    <button className='btn-tieptuc' onClick={handleNextWeek}>Tiếp tục <FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
            <div className="calendar-body">
                {/* Bảng lịch học */}
                <div className="table-responsive">
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th>Ca học</th>
                                {/* Sử dụng mảng thẻ <th> đã được tạo */}
                                {weekDaysTh}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='study'>Sáng</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td className='study'>Chiều</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td className='study'>Tối</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Chú thích màu sắc */}
                <div className="legend">
                    <ul>
                        <li><span className="colorSTLichHocLT"></span><label >Lịch học lý thuyết</label></li>
                        <li><span className="colorSTLichHocTH"></span><label >Lịch học thực hành</label></li>
                        <li><span className="colorSTLichHoc"></span><label >Lịch học trực tuyến</label></li>
                        <li><span className="colorSTLichThi"></span><label >Lịch thi</label></li>
                        <li><span className="colorSTTamNgung"></span><label >Lịch tạm ngưng</label></li>
                    </ul>
                </div>
            </div>
            <div className="additional-content">
                {/* Các phần khác trong giao diện */}
            </div>
        </div>
    );
}

export default StudentCalendar;