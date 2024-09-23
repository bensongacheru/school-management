import React, { useState } from 'react';
import axios from 'axios';

const AddGradeForm = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/grades/', {
        student_id: studentId,
        subject: subject,
        grade: grade,
        date: date,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </label>
      <br />
      <label>
        Grade:
        <input type="text" value={grade} onChange={(event) => setGrade(event.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <br />
      <label>
        Student ID:
        <input type="number" value={studentId} onChange={(event) => setStudentId(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Grade</button>
    </form>
  );
};

export default AddGradeForm;
