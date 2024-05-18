import React, { useEffect, useState } from 'react'
import "./scademicResult.css"
import Header from '../../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AcademicResult() {

    // const [student, setStudent] = useState(null);
    const [semesters, setSemesters] = useState([]);
    const [subjectsAndGrades, setSubjectsAndGrades] = useState([]);
    const [semesterAverages, setSemesterAverages] = useState({});

    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
            const studentData = JSON.parse(storedStudent);
            // setStudent(studentData);
            // fetchSemesters(studentData.id);

            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/${studentData.id}/semesters`);
                    setSemesters(response.data);
                    console.log(response.data);
                    // Fetch grades for all semesters
                    await Promise.all(response.data.map(semester => fetchGrades(studentData.id, semester.id)));
                    await Promise.all(response.data.map(semester => fetchSemesterAverage(studentData.id, semester.id))); // Gọi API để lấy điểm trung bình học kì

                } catch (error) {
                    console.error('Error fetching semesters:', error);
                }
            };

            fetchData();
        }
    }, []);

    // const fetchSemesters = async (studentId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8081/${studentId}/semesters`);
    //         setSemesters(response.data);
    //         console.log(response.data);
    //         // Fetch grades for all semesters
    //         await Promise.all(response.data.map(semester => fetchGrades(studentId, semester.id)));
    //         await Promise.all(response.data.map(semester => fetchSemesterAverage(studentId, semester.id))); // Gọi API để lấy điểm trung bình học kì

    //     } catch (error) {
    //         console.error('Error fetching semesters:', error);
    //     }
    // };



    const fetchGrades = async (studentId, semesterId) => {
        try {
            const response = await axios.get(`http://localhost:8081/${studentId}/grades?semesterId=${semesterId}`);
            setSubjectsAndGrades(prevState => [...prevState, ...response.data]);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching grades for semester:', error);
        }
    };

    const fetchSemesterAverage = async (studentId, semesterId) => {
        try {
            const response = await axios.get(`http://localhost:8081/${studentId}/semester-average?semesterId=${semesterId}`); // Gọi API để lấy điểm trung bình học kì
            setSemesterAverages(prevState => ({
                ...prevState,
                [semesterId]: response.data // Lưu điểm trung bình học kì vào state
            }));
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching semester average:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='AcademicResult-result-title'>
                <h3>Kết quả học tập</h3>
                <hr className="horizontal-line" />
            </div>
            <div className="table-wrapper">
                <table className="AcademicResult-table-custom" width="100%">
                    <thead>
                        <tr>
                            <th rowspan="3" >STT</th>
                            <th rowspan="3">Mã lớp học phần</th>
                            <th rowspan="3">Tên môn học/học phần</th>
                            <th rowspan="3" >Số tín chỉ</th>
                            <th colspan="2">Giữa kỳ</th>
                            <th colspan="9">Thường xuyên</th>
                            <th colspan="5">Thực hành</th>
                            <th rowspan="3">Cuối kỳ</th>
                            <th rowspan="3">Điểm tổng kết</th>
                            <th rowspan="3">Thang điểm 4</th>
                            <th rowspan="3">Điểm chữ</th>
                            <th rowspan="3">Xếp loại</th>
                            <th rowspan="3">Ghi chú</th>
                            <th rowspan="3">TBQT</th>
                            <th rowspan="3">Đạt</th>
                        </tr>
                        <tr>
                            <th rowspan="2">1</th>
                            <th rowspan="2">Chuyên cần</th>
                            <th colspan="9">LT Hệ số 1</th>
                            <th rowspan="2">1</th>
                            <th rowspan="2">2</th>
                            <th rowspan="2">3</th>
                            <th rowspan="2">4</th>
                            <th rowspan="2">5</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <td className='semester' colspan="28">HK1 (2020-2021)</td>
                        <tr>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><FontAwesomeIcon className='text-success' icon={faCircleCheck} /></td>
                        </tr>
                        <tr>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr> */}

                        {/* Sử dụng vòng lặp để tạo các hàng và cột */}
                        {semesters.map((semester, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='semester' colSpan="28">{semester.name} ({semester.course})</td>
                                </tr>
                                {subjectsAndGrades
                                    .filter(subject => subject.semesterId === semester.id)
                                    .map((subject, subIndex) => {
                                        // In ra dữ liệu của mỗi subject
                                        return (
                                            <tr key={subIndex}>
                                                <td>{subIndex + 1}</td>
                                                <td>{subject.classId}</td>
                                                <td>{subject.nameSubject}</td>
                                                <td>{subject.credit}</td>
                                                <td>{subject.gk}</td>
                                                <td></td>
                                                <td>{subject.tk1}</td>
                                                <td>{subject.tk2}</td>
                                                <td>{subject.tk3}</td>
                                                <td>{subject.tk4}</td>
                                                <td>{subject.tk5}</td>
                                                <td>{subject.tk6}</td>
                                                <td>{subject.tk7}</td>
                                                <td>{subject.tk8}</td>
                                                <td>{subject.tk9}</td>

                                                <td>{subject.th1}</td>
                                                <td>{subject.th2}</td>
                                                <td>{subject.th3}</td>
                                                <td>{subject.th4}</td>
                                                <td>{subject.th5}</td>
                                                <td>{subject.ck}</td>
                                                <td>{subject.tbsubject}</td>
                                                <td>{subject.tbh4}</td>
                                                <td>{subject.letterGrade}</td>
                                                <td>{subject.rank}</td>
                                                <td></td>
                                                {/* <td>{semesterAverages[semester.id]?.tbhk10}</td> */}
                                                <td></td>
                                                {/* <td>{subject.pass === true ? 'Pass' : subject.pass === false ? 'Fail' : ''}</td> */}
                                                <td>
                                                    {subject.pass !== null ? (
                                                        subject.pass ? (
                                                            <FontAwesomeIcon icon={faCircleCheck} className='text-success' />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faCircleXmark} className='text-danger' />
                                                        )
                                                    ) : null}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                {/* <tr>
                                    <td colSpan="28"></td>
                                </tr> */}
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình học kì hệ 10: {semesterAverages[semester.id]?.tbhk10}</td>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình học kì hệ 4: {semesterAverages[semester.id]?.tbhk4}</td>
                                    <td colSpan="24"></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình tích lũy hệ 10: {semesterAverages[semester.id]?.tbtl10}</td>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình tích lũy hệ 4: {semesterAverages[semester.id]?.tbtl4}</td>
                                    <td colSpan="24"></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đã đăng ký: {semesterAverages[semester.id]?.sumRegisteredCredit}</td>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đã tích lũy: {semesterAverages[semester.id]?.totalAccumulatedCredits}</td>
                                    <td colSpan="24"></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đạt: {semesterAverages[semester.id]?.passCredit}</td>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín nợ đến hiện tại: {semesterAverages[semester.id]?.owedCredit}</td>
                                    <td colSpan="24"></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Xếp loại học lực tích lũy: {semesterAverages[semester.id]?.rankedAcademicResult}</td>
                                    <td colSpan="2" style={{ textAlign: 'left' }}>Xếp loại học lực học kỳ: {semesterAverages[semester.id]?.rankedAcademic}</td>
                                    <td colSpan="24"></td>
                                </tr>
                            </React.Fragment>
                        ))}
                        {/* <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                            <td colSpan="24"></td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                            <td colSpan="24"></td>
                        </tr> */}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AcademicResult
