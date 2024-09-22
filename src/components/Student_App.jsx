import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';

const StudentApp = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch students from the backend
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, []);

  const addStudent = async (newStudent) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/students', newStudent);
      setStudents((prevStudents) => [...prevStudents, response.data]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/students/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter(s => s.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm addStudent={addStudent} />
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <div>{student.name}</div>
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentApp;
