import React, { useState, useEffect, useRef } from 'react'
import './registerCourse.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function RegisterCourse() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('HỌC MỚI'); // new state variable for radio buttons
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [selectedClassStatus, setSelectedClassStatus] = useState(null);

  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');

  const [selectedRadioSubject, setSelectedRadioSubject] = useState('');
  const [selectRadioClass, setSelectRadioClass] = useState('')
  // const [selectRadioClassDetail, setSelectRadioClassDetail] = useState('')

  const [course, setCourse] = useState([]);
  const [tableData, setTableData] = useState([])
  const [classData, setClassData] = useState([])
  const [regis, setRegis] = useState([])

  const indexOption = useRef();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    console.log('Selected option đợt đăng ký:', event.target.value);

    const index = Number(event.target.value) + 1;
    console.log('Index:', index)

    if (indexOption.current > event.target.value || indexOption.current < event.target.value) {
      window.confirm("Bạn không thể đăng ký đợt này");
      window.location.reload();
    }
  }

  const handleRadioChange = (event) => { // new handler for radio buttons
    setSelectedRadio(event.target.value);
  }

  const handleRadioSubject = async (event) => { // new handler for radio buttons
    setSelectedRadioSubject(event.target.value);

    const classesUrl = `http://localhost:8081/course/classes/${event.target.value}?semesterId=${selectedOption}`;
    const response = await axios.get(classesUrl);

    const currentDate = new Date();

    const dataWithId = await Promise.all(response.data.map(async (item, index) => {
      const schedule = `${item.dayOfWeek} (${item.lesson})`;
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const status = startDate <= currentDate && currentDate <= endDate;

      // Get students for the class
      const studentsUrl = `http://localhost:8081/course/classes/${item.id}/students`;
      const studentsResponse = await axios.get(studentsUrl);
      const students = studentsResponse.data;

      return {
        stt: index + 1,
        ...item,
        schedule,
        status,
        students
      };
    }));
    console.log('Data with id:', dataWithId);
    setClassData(dataWithId);
  }

  const handleRadioClass = (event) => {
    setSelectRadioClass(event.target.value);
    setClassId(event.target.value)
  }

  // const handleRadioClassDetail = (event) => {
  //   setSelectRadioClassDetail(event.target.value);
  // }

  const handleEnroll = async () => {
    console.log('selectedClassStatus:', selectedClassStatus);
    if (selectedClassStatus === false) {
      alert('Không thể đăng ký môn học này do chưa tới thời gian đăng ký');
      return;
    }

    const selectedClass = classData.find(item => item.id === classId);
    console.log('Selected class:', selectedClass);

    // Check if the class is full
    if (selectedClass && selectedClass.students >= selectedClass.maxEnrollment) {
      alert('Không thể đăng ký môn học này do lớp đã đầy');
      return;
    }

    const confirmation = window.confirm("Bạn xác nhận đăng ký môn học này?");
    if (confirmation) {

      const url = 'http://localhost:8081/course/enroll';

      const response = await axios.post(url, {
        studentId: studentId,
        classId: classId,
      });

      alert(response.data);

      window.location.reload();
    }
  };

  const radioOptions = [
    { label: 'HỌC MỚI', value: 'HỌC MỚI' },
    { label: 'HỌC LẠI', value: 'HỌC LẠI' },
    { label: 'HỌC CẢI THIỆN', value: 'HỌC CẢI THIỆN' }
  ];

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    if (storedStudent) {
      const parsedStudent = JSON.parse(storedStudent);
      console.log('Parsed student:', parsedStudent);
      setStudentId(parsedStudent.id)

      const fetchData = async () => {
        try {
          //Lấy học kỳ hiện tại
          const currentSemesterUrl = 'http://localhost:8081/course/current-semester';
          const response1 = await axios.get(currentSemesterUrl);
          const semester = response1.data;
          const formattedSemester = `${semester.name} (${semester.course})`;
          console.log('Formatted semester: ', formattedSemester);
          console.log('Index:', semester.startDate);
          console.log('Index:', semester.endDate);

          const currentDate = new Date();
          const startDate = new Date(semester.startDate);
          const endDate = new Date(semester.endDate);
          const status = startDate <= currentDate && currentDate <= endDate;
          setSelectedClassStatus(status);

          //Lấy từ học kỳ nhập học vào đến hiện tại
          const url = `http://localhost:8081/course/semesters-in-range?course=${parsedStudent.course}`;
          const response2 = await axios.get(url);
          const newArray = response2.data.object.map(item => ({ id: item.id, course: `${item.name} (${item.course})` }));
          setCourse(newArray);
          const index = newArray.findIndex(item => item.course === formattedSemester);
          setSelectedOption(newArray[index]?.id || '');

          indexOption.current = index + 1;

          //Lấy thông tin môn học
          const major = parsedStudent.major.id; // Replace with actual major
          const subjectsUrl = `http://localhost:8081/course/${parsedStudent.id}/subjects?major=${major}`;
          const response3 = await axios.get(subjectsUrl);
          const dataWithId = response3.data.map((item, index) => ({
            id: index + 1,
            ...item
          }));
          setTableData(dataWithId);

          //Lấy lớp học đã đăng ký trong kỳ này
          const classesUrl = `http://localhost:8081/course/${parsedStudent.id}/classes`;
          const response4 = await axios.get(classesUrl);
          const classWithId = response4.data.map((item, index) => ({
            stt: index + 1,
            ...item
          }));
          console.log('Class with id:', classWithId);
          setRegis(classWithId);

          // Get students for the class
        } catch (error) {
          console.log('Error:', error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className='RegisterCourse-body'>
      <div className='RegisterCourse-head'>
        <h1>ĐĂNG KÝ HỌC PHẦN</h1>
        <div className='RegisterCourse-head-text'>
          <span>Đợt đăng ký</span>
          <select value={selectedOption} onChange={handleChange}>
            {course.map((item, index) => (
              <option key={index} value={item.id}>
                {item.course}
              </option>
            ))}
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
              <th>Học phần tiên quyết</th>
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
                    value={row.subjectId}
                    checked={selectedRadioSubject === row.subjectId.toString()}
                    onChange={handleRadioSubject}
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.subjectId}</td>
                <td>{row.name}</td>
                <td>{row.credits}</td>
                <td>{row.status ? <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> : <FontAwesomeIcon icon={faCircleXmark} className='text-danger' />}</td>
                <td>{row.parentId}</td>
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
              <th>Lịch học</th>
              <th>Phòng học</th>
              <th>Giảng viên</th>
              <th>Thời gian</th>
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
                    checked={selectRadioClass === row.id.toString()}
                    onChange={handleRadioClass}
                  />
                </td>
                <td>{row.stt}</td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.id}</td>
                <td>{row.maxEnrollment}</td>
                <td>{row.students}/{row.maxEnrollment}</td>
                <td>{row.schedule}</td>
                <td>{row.classroom}</td>
                <td>{row.teacher}</td>
                <td>{row.startDate} - {row.endDate}</td>
                <td>{selectedClassStatus ? <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> : <FontAwesomeIcon icon={faCircleXmark} className='text-danger' />}</td>
              </tr>
            ))}
          </tbody>

        </table>
        <button className='RegisterCourse-contentClass-btn' onClick={handleEnroll}>Đăng ký môn học</button>


      </div>

      {/* <div className='RegisterCourse-class'>
        <div className='RegisterCourse-body-head'>
          <h6>CHI TIẾT LỚP HỌC PHẦN</h6>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Lịch học</th>
              <th>Phòng học</th>
              <th>Giảng viên</th>
              <th>Thời gian</th>
            </tr>
          </thead>


          <tbody>
            {classData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    id={`class-option-${index}`}
                    name="registerCourseClassDetail"
                    value={row.id}
                    checked={selectRadioClassDetail === row.id.toString()}
                    onChange={handleRadioClassDetail}
                  />
                </td>
                <td>{row.stt}</td>
                <td>{row.schedule}</td>
                <td>{row.classroom}</td>
                <td>{row.teacher}</td>
                <td>{row.startDate} - {row.endDate}</td>
              </tr>
            ))}
          </tbody>

        </table>

        <button className='RegisterCourse-class-btn'>Đăng ký môn học</button>
      </div> */}

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


          <tbody>
            {regis.map((row, index) => (
              <tr key={index}>
                <td><FontAwesomeIcon icon={faTrashCan} className='text-danger' /></td>
                <td>{row.stt}</td>
                <td>{row.classId}</td>
                <td>{row.name}</td>
                <td>{row.classId}</td>
                <td>{row.credits}</td>
                <td>{row.total}</td>
                <td>{row.regisDate}</td>
                <td>{selectedClassStatus ? <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> : <FontAwesomeIcon icon={faCircleXmark} className='text-danger' />}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>



    </div>

  )
}

export default RegisterCourse
