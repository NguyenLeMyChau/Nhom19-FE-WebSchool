import React, { useState, useEffect } from 'react'
import './header.css'

function Options() {

  const handleLogout = () => {
    localStorage.removeItem('student'); // Xóa student khỏi localStorage
    window.location.href = '/'; // Chuyển hướng về trang login
  }
  
  return (
    <div className='options'>
      <p className='clickable-p'>Thông tin cá nhân</p>
      <p className='clickable-p'>Đổi mật khẩu</p>
      <p className='clickable-p' onClick={handleLogout}>Đăng xuất</p>
    </div>
  )
}

function Header() {
  const [showOptions, setShowOptions] = useState(false);

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    console.log('storedStudent: ', storedStudent)
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  const handleClick = () => {
    setShowOptions(!showOptions);
  }

  return (
    <div className='header-body'>
      <div className='header-form'>

        <input type="search" placeholder="Tìm kiếm..." />

        <p>Trang chủ</p>
        <p>Tin tức</p>
        <div style={{ position: 'relative' }}>
          <p onClick={handleClick}>

            <img
              src={"https://avatar-zalo.s3.ap-southeast-1.amazonaws.com/zalo/W660ed5529708027aa62bc682_W1713430550705.jpg"}
              alt="Student Information"
              className='header-img'
            />
            {student ? student.name : ''}
          </p>
          {showOptions && <Options />}
        </div>
      </div>

    </div>

  )
}

export default Header
