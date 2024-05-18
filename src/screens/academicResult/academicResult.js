import React, { useEffect, useState } from 'react'
import "./scademicResult.css"
import Header from '../../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AcademicResult() {

    const [semesters, setSemesters] = useState([]);
    const [subjectsAndGrades, setSubjectsAndGrades] = useState([]);
    const [semesterAverages, setSemesterAverages] = useState({});

    useEffect(() => {
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
            const studentData = JSON.parse(storedStudent);

            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/${studentData.id}/semesters`);
                    setSemesters(response.data);

                    // Fetch grades and averages for all semesters
                    await Promise.all(response.data.map(semester => fetchGrades(studentData.id, semester.id)));
                    await Promise.all(response.data.map(semester => fetchSemesterAverage(studentData.id, semester.id)));

                } catch (error) {
                    console.error('Error fetching semesters:', error);
                }
            };

            fetchData();
        }
    }, []);

    const fetchGrades = async (studentId, semesterId) => {
        try {
            const response = await axios.get(`http://localhost:8081/${studentId}/grades?semesterId=${semesterId}`);
            setSubjectsAndGrades(prevState => [...prevState, ...response.data]);
        } catch (error) {
            console.error('Error fetching grades for semester:', error);
        }
    };

    const fetchSemesterAverage = async (studentId, semesterId) => {
        try {
            const response = await axios.get(`http://localhost:8081/${studentId}/semester-average?semesterId=${semesterId}`);
            setSemesterAverages(prevState => ({
                ...prevState,
                [semesterId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching semester average:', error);
        }
    };

    const renderAverageRows = (semesterId) => {
        const semesterAverage = semesterAverages[semesterId];
        if (!semesterAverage) return null;

        return (
            <>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình học kỳ hệ 10: {semesterAverage.tbhk10}</td>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình học kỳ hệ 4: {semesterAverage.tbhk4}</td>
                    <td colSpan="24"></td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình tích lũy hệ 10: {semesterAverage.tbtl10}</td>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Điểm trung bình tích lũy hệ 4: {semesterAverage.tbtl4}</td>
                    <td colSpan="24"></td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đã đăng ký: {semesterAverage.sumRegisteredCredit}</td>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đã tích lũy: {semesterAverage.totalAccumulatedCredits}</td>
                    <td colSpan="24"></td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín chỉ đạt: {semesterAverage.passCredit}</td>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Tổng số tín nợ đến hiện tại: {semesterAverage.owedCredit}</td>
                    <td colSpan="24"></td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Xếp loại học lực tích lũy: {semesterAverage.rankedAcademicResult}</td>
                    <td colSpan="2" style={{ textAlign: 'left' }}>Xếp loại học lực học kỳ: {semesterAverage.rankedAcademic}</td>
                    <td colSpan="24"></td>
                </tr>
            </>
        );
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
                            <th rowSpan="3">STT</th>
                            <th rowSpan="3">Mã lớp học phần</th>
                            <th rowSpan="3">Tên môn học/học phần</th>
                            <th rowSpan="3">Số tín chỉ</th>
                            <th colSpan="2">Giữa kỳ</th>
                            <th colSpan="9">Thường xuyên</th>
                            <th colSpan="5">Thực hành</th>
                            <th rowSpan="3">Cuối kỳ</th>
                            <th rowSpan="3">Điểm tổng kết</th>
                            <th rowSpan="3">Thang điểm 4</th>
                            <th rowSpan="3">Điểm chữ</th>
                            <th rowSpan="3">Xếp loại</th>
                            <th rowSpan="3">Ghi chú</th>
                            <th rowSpan="3">TBQT</th>
                            <th rowSpan="3">Đạt</th>
                        </tr>
                        <tr>
                            <th rowSpan="2">1</th>
                            <th rowSpan="2">Chuyên cần</th>
                            <th colSpan="9">LT Hệ số 1</th>
                            <th rowSpan="2">1</th>
                            <th rowSpan="2">2</th>
                            <th rowSpan="2">3</th>
                            <th rowSpan="2">4</th>
                            <th rowSpan="2">5</th>
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
                        {semesters.map((semester, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='semester' colSpan="28">{semester.name} ({semester.course})</td>
                                </tr>
                                {subjectsAndGrades
                                    .filter(subject => subject.semesterId === semester.id)
                                    .map((subject, subIndex) => (
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
                                            <td></td>
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
                                    ))
                                }
                                {/* Hiển thị thông tin điểm trung bình cho học kỳ */}
                                {renderAverageRows(semester.id)}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AcademicResult

