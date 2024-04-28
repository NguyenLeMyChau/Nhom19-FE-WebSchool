import React from 'react'
import "./scademicResult.css"
import Header from '../../components/header/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function AcademicResult() {
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
                        <td className='semester' colspan="28">HK1 (2020-2021)</td>
                        <tr>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><FontAwesomeIcon className='text-success' icon={faCircleCheck} /></td>
                        </tr>
                        <tr>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                            <td colSpan="24"></td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2"></td>
                            <td colSpan="24"></td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AcademicResult
