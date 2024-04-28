import React, { useState } from 'react';
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Header from '../../components/header/header';

function Home() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    // Tổng số
    const total = 156;
    // Số đạt được
    const achieved = 125;

    // Tính toán phần trăm
    const percentage = (achieved / total) * 100;

    return (
        <div className='home-body'>
            <Header/>
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
                                    <p>MSSV: <span>20046631</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Lớp học: <span>DHKTPM16A</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Họ tên: <span>Nguyễn Lê Mỹ Châu</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Khóa học: <span>2020 - 2021</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Giới tính: <span>Nữ</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Bậc đào tạo: <span>Đại học</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Ngày sinh: <span>12/01/2002</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Loại hình đào tạo: <span>Chính quy</span></p>
                                </div>
                            </div>

                            <div className='home-form-group'>
                                <div className='col-lg-6'>
                                    <p>Nơi sinh: <span>Thành phố Hồ Chí Minh</span></p>
                                </div>
                                <div className='col-lg-6'>
                                    <p>Ngành: <span>Kỹ thuật phần mềm</span></p>
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
                        <div className='home-schedule-calendar-text' style={{ backgroundColor: '#e0fbff', color: '#4da1e8' }}>
                            <p>Lịch học trong tuần</p>
                            <p style={{ fontSize: 42, lineHeight: 1, marginTop: -3 }}>4</p>
                            <p style={{ fontSize: 14, lineHeight: 1, marginTop: -3 }}>Xem chi tiết</p>
                        </div>

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
                    <p>Lịch theo tuần</p>
                </div>

                <div className='col-sm-2 home-option-form'>
                    <p>Kết quả học tập</p>

                </div>

                <div className='col-sm-2 home-option-form'>
                    <p>Đăng ký học phần</p>
                </div>

                <div className='col-sm-2 home-option-form'>
                    <p>Tra cứu công nợ</p>
                </div>

                <div className='col-sm-2 home-option-form' style={{ marginRight: 0 }}>
                    <p>Nhắc nhở</p>
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
                        <p style={{marginTop: 20, fontSize: 18}}>{`${achieved}/${total}`}</p>

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
