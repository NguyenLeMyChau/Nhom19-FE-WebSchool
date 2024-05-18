import React, { useState, useEffect } from 'react';
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Header from '../../components/header/header';

function Home() {
    const [selectedOption, setSelectedOption] = useState('');
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        console.log('storedStudent: ', storedStudent)
        if (storedStudent) {
            setStudent(JSON.parse(storedStudent));
        }
    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const navigateToSchedule = () => {
        if (student && student.id) {
            window.location.href = `/schedule?studentId=${student.id}`;
        }
    };

    // Tổng số
    const total = student ? student.totalCredits : 0;
    // Số đạt được
    const achieved = student ? student.completedCredits : 0;

    // Tính toán phần trăm
    const percentage = (achieved / total) * 100;

    return (
        <div className='home-body'>
            <Header />
            <div className='home-head'>
                <div className='home-info'>
                    <h3 className='home-text-head'>Thông tin sinh viên</h3>
                    <div className='home-info-head'>
                        <img
                            src={"https://avatar-zalo.s3.ap-southeast-1.amazonaws.com/zalo/W660ed5529708027aa62bc682_W1713430550705.jpg"}
                            alt="Student Information"
                            className='home-info-head-img'
                        />

                        <div className='home-info-head-info'>
                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>MSSV: <span>{student ? student.id : ''}</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Lớp học: <span>DHKTPM16A</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Họ tên: <span>{student ? student.name : ''}</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Khóa học: <span>{student ? student.course : ''}</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Giới tính: <span>{student && student.gender ? 'Nữ' : 'Nam'}</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Bậc đào tạo: <span>Đại học</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Ngày sinh: <span>{student ? student.dateOfBirth : ''}</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Loại hình đào tạo: <span>Chính quy</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Nơi sinh: <span>{student ? student.address : ''}</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Ngành: <span>{student ? student.major.name : ''}</span></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='home-schedule'>
                    <div className='home-schedule-remind'>
                        <p>Nhắc nhở mới, chưa xem</p>
                        <p style={{ fontSize: 42, marginTop: -20, color: '#384289' }}>0</p>
                        <p style={{ fontSize: 14, color: '#1da1f2', marginTop: -22 }}>Xem chi tiết</p>
                    </div>

                    <div className='home-schedule-calendar'>
                        <button onClick={navigateToSchedule} className='home-schedule-calendar-text' style={{ backgroundColor: '#e0fbff', color: '#4da1e8', border: 'none' }}>
                            <p >Lịch học trong tuần</p>
                            <p style={{ fontSize: 42, lineHeight: 1, marginTop: -3 }}>4</p>
                            <p style={{ fontSize: 14, lineHeight: 1, marginTop: -3 }}>Xem chi tiết</p>
                        </button>
                        {/* <button
                            className='home-schedule-calendar-text'
                            style={{
                                backgroundColor: '#e0fbff',
                                color: '#4da1e8',
                                // border: 'none',
                                // padding: 0, // Thêm padding: 0 để loại bỏ khoảng cách mặc định của button
                                cursor: 'pointer' // Đảm bảo con trỏ dạng tay khi rê chuột vào toàn bộ button
                            }}
                        >
                            <p style={{ cursor: 'pointer', margin: 0 }} onClick={navigateToSchedule}>Lịch học trong tuần</p>
                            <p style={{ fontSize: 42, lineHeight: 1, margin: 0 }}>4</p>
                            <p style={{ fontSize: 14, lineHeight: 1, margin: 0 }}>Xem chi tiết</p>
                        </button> */}


                        <div className='home-schedule-calendar-text' style={{ backgroundColor: '#fff2d4', color: '#ff9205' }}>
                            <p>Lịch thi trong tuần</p>
                            <p style={{ fontSize: 42, lineHeight: 1, marginTop: -3 }}>0</p>
                            <p style={{ fontSize: 14, lineHeight: 1, marginTop: -3 }}>Xem chi tiết</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='home-option'>

                <div className='col-sm-2 home-option-form'>
                    <p style={{ cursor: 'pointer' }} onClick={navigateToSchedule}>Lịch theo tuần</p>
                </div>

                <div className='col-sm-2 home-option-form'>
                    <p style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/AcademicResult'}>Kết quả học tập</p>

                </div>

                <div className='col-sm-2 home-option-form'>
                    <p style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/RegisterCourse'}>Đăng ký học phần</p>
                </div>

                <div className='col-sm-2 home-option-form'>
                    <p style={{ cursor: 'pointer' }}>Tra cứu công nợ</p>
                </div>

                <div className='col-sm-2 home-option-form' style={{ marginRight: 0 }}>
                    <p style={{ cursor: 'pointer' }}>Nhắc nhở</p>
                </div>

            </div>

            <div className='home-footer'>
                <div className='col-sm-5 home-footer-title'>
                    <div className='home-row'>
                        <h3 className='home-text-head'>Kết quả học tập</h3>
                        <select value={selectedOption} onChange={handleChange}>
                            <option value="option1">HK2 (2023-2024)</option>
                            <option value="option2">HK1 (2023-2024)</option>
                            <option value="option3">HK2 (2022-2023)</option>
                        </select>
                    </div>

                </div>

                <div className='col-sm-2-5 home-footer-title'>
                    <div className='home-column'>
                        <h3 className='home-text-head'>Tiến độ học tập</h3>
                    </div>

                    <div className='home-center'>
                        <div style={{ width: 170, height: 170 }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage.toFixed(0)}%`} styles={buildStyles({
                                    // Màu của text
                                    textColor: "black",
                                    // Màu của đường tiến trình
                                    pathColor: "turquoise",
                                    // Màu của đường tiến trình còn lại
                                    trailColor: "silver"
                                })}
                            />

                        </div>
                        <p style={{ marginTop: 20, fontSize: 18 }}>{`${achieved}/${total}`}</p>

                    </div>

                </div>

                <div className='col-sm-4 home-footer-title'>
                    <div className='home-row'>

                        <h3 className='home-text-head'>Lớp học phần</h3>
                        <select value={selectedOption} onChange={handleChange}>
                            <option value="option1">HK2 (2023-2024)</option>
                            <option value="option2">HK1 (2023-2024)</option>
                            <option value="option3">HK2 (2022-2023)</option>
                        </select>
                    </div>
                </div>

            </div>
        </div >

    )
}

export default Home
