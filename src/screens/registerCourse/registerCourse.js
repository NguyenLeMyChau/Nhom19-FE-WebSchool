import React, { useState } from 'react'
import './registerCourse.css'


function RegisterCourse() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRadio, setSelectedRadio] = useState(''); // new state variable for radio buttons
  const [selectedRadioTable1, setSelectedRadioTable1] = useState(''); // new state variable for radio buttons
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleRadioChange = (event) => { // new handler for radio buttons
    setSelectedRadio(event.target.value);
  }
  const handleRadioChange1 = (event) => { // new handler for radio buttons
    setSelectedRadioTable1(event.target.value);
  }


  const radioOptions = [
    { label: 'HỌC MỚI', value: 'HỌC MỚI' },
    { label: 'HỌC LẠI', value: 'HỌC LẠI' },
    { label: 'HỌC CẢI THIỆN', value: 'HỌC CẢI THIỆN' }
  ];

  const tableData = [
    {
      id: 1,
      code: 'IT1234',
      name: 'Kiến trúc hướng dịch vụ và điện toán đám mây',
      credits: 3,
      mandatory: true,
      prerequisites: 'Không có'
    },
    {
      id: 2,
      code: 'IT5678',
      name: 'Lập trình Python',
      credits: 3,
      mandatory: false,
      prerequisites: 'IT1234'
    },
    {
      id: 3,
      code: 'IT9101',
      name: 'Lập trình C#',
      credits: 4,
      mandatory: true,
      prerequisites: 'Không có'
    },
    {
      id: 4,
      code: 'IT1122',
      name: 'Lập trình JavaScript',
      credits: 3,
      mandatory: false,
      prerequisites: 'IT1234'
    },
    {
      id: 5,
      code: 'IT3344',
      name: 'Lập trình PHP',
      credits: 2,
      mandatory: true,
      prerequisites: 'IT5678'
    }
  ];

  const classData = [
    {
      id: 1,
      classCode: 'IT1234-01',
      className: 'Kiến trúc hướng dịch vụ và điện toán đám mây - Nhóm 01',
      expectedClass: 'A1',
      maxStudents: 50,
      registered: 30,
      status: 'Open'
    },
    {
      id: 2,
      classCode: 'IT5678-01',
      className: 'Lập trình Python - Nhóm 01',
      expectedClass: 'A2',
      maxStudents: 50,
      registered: 45,
      status: 'Open'
    },
    {
      id: 3,
      classCode: 'IT9101-01',
      className: 'Lập trình C# - Nhóm 01',
      expectedClass: 'A3',
      maxStudents: 50,
      registered: 50,
      status: 'Closed'
    }
  ];

  return (
    <div className='RegisterCourse-body'>
      <div className='RegisterCourse-head'>
        <h1>ĐĂNG KÝ HỌC PHẦN</h1>
        <div className='RegisterCourse-head-text'>
          <span>Đợt đăng ký</span>
          <select value={selectedOption} onChange={handleChange}>
            <option value="option1">HK2 (2023-2024)</option>
            <option value="option2">HK1 (2023-2024)</option>
            <option value="option3">HK2 (2022-2023)</option>
          </select>

          {radioOptions.map((option, index) => (
            <div className='RegisterCourse-head-text-radio-option' key={index}>
              <input
                type="radio"
                id={option.value}
                name="registerCourseOption"
                value={option.value}
                checked={selectedRadio === option.value}
                onChange={handleRadioChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className='RegisterCourse-content'>
        <div className='RegisterCourse-body-head'>
          <h6>MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÝ</h6>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Mã HP</th>
              <th>Tên môn học</th>
              <th>TC</th>
              <th>Bắt buộc</th>
              <th>Học phần: Học trước (a), tiên quyết (b), song hành (c)</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="registerCourseTable"
                    value={row.id}
                    checked={selectedRadioTable1 === row.id.toString()}
                    onChange={handleRadioChange1}
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.credits}</td>
                <td>{row.mandatory ? 'Có' : 'Không'}</td>
                <td>{row.prerequisites}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      <div className='RegisterCourse-contentClass'>
        <div className='RegisterCourse-body-head'>
          <h6>LỚP HỌC PHẦN CHỜ ĐĂNG KÝ</h6>
          <div className='RegisterCourse-contentClass-head-cb'>
            <input
              type="checkbox"
              id="newCheckbox"
              name="newCheckbox"
              checked={selectedCheckbox}
              onChange={(event) => setSelectedCheckbox(event.target.checked)}
            />
            <label htmlFor="newCheckbox">HIỂN THỊ LỚP HỌC PHẦN KHÔNG TRÙNG LỊCH</label>
          </div>

        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Mã lớp HP</th>
              <th>Tên lớp học phần</th>
              <th>Lớp dự kiến</th>
              <th>Sĩ số tối đa</th>
              <th>Đã đăng ký</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {classData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    id={`class-option-${index}`}
                    name="registerCourseClass"
                    value={row.id}
                  // checked={selectedRadioTable2 === row.id.toString()} // You need to create a new state variable for this table
                  // onChange={handleRadioChange2} // You need to create a new handler for this table
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.classCode}</td>
                <td>{row.className}</td>
                <td>{row.expectedClass}</td>
                <td>{row.maxStudents}</td>
                <td>{row.registered}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>


        </table>

      </div>

      <div className='RegisterCourse-class'>
        <div className='RegisterCourse-body-head'>
          <h6>CHI TIẾT LỚP HỌC PHẦN</h6>
        </div>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Lịch học</th>
              <th>Phòng học</th>
              <th>Giảng viên</th>
              <th>Thời gian</th>
            </tr>
          </thead>
        </table>

        <button className='RegisterCourse-class-btn'>Đăng ký môn học</button>
      </div>

      <div className='RegisterCourse-semester'>
        <div className='RegisterCourse-body-head'>
          <h6>LỚP HỌC PHẦN ĐÃ ĐĂNG KÝ TRONG HỌC KỲ NÀY</h6>
        </div>

        <table>
          <thead>
            <tr>
              <th>Thao tác</th>
              <th>STT</th>
              <th>Mã LHP</th>
              <th>Tên môn học</th>
              <th>Lớp học dự kiến</th>
              <th>TC</th>
              <th>Học phí</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái lớp học phần</th>
            </tr>
          </thead>
        </table>

      </div>



    </div>

  )
}

export default RegisterCourse
