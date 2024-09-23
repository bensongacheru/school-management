import React, { useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendanceDate, setAttendanceDate] = useState('');
  const [status, setStatus] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/attendance/', {
        student_id: studentId,
        attendance_date: attendanceDate,
        status: status,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Attendance Date:
        <input type="date" value={attendanceDate} onChange={(event) => setAttendanceDate(event.target.value)} />
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
      <br />
      <label>
        Student ID:
        <input type="number" value={studentId} onChange={(event) => setStudentId(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Attendance</button>
    </form>
  );
};

export default Attendance;
