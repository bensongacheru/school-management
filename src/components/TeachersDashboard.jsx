import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentForm from './StudentForm';
import AddGradeForm from './AddGradeForm';

const TeachersDashboard = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddGradeForm, setShowAddGradeForm] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/teachers/');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherSelect = async (teacher) => {
    setSelectedTeacher(teacher);
    try {
      const studentsResponse = await axios.get(`http://127.0.0.1:8000/students/?teacherId=${teacher.id}`);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
    setSelectedStudent(null);
  };

  const handleStudentSelect = async (student) => {
    setSelectedStudent(student);
    try {
      const attendanceResponse = await axios.get(`http://127.0.0.1:8000/attendance/?studentId=${student.id}`);
      setAttendance(attendanceResponse.data);
      const gradesResponse = await axios.get(`http://127.0.0.1:8000/grades/?studentId=${student.id}`);
      setGrades(gradesResponse.data);
    } catch (error) {
      console.error('Error fetching attendance or grades:', error);
    }
  };

  const addStudent = async (newStudent) => {
    try {
      const studentData = {
        name: newStudent.name,
        teacher_id: selectedTeacher.id,
      };
      const response = await axios.post('http://127.0.0.1:8000/students/', studentData);
      setStudents((prevStudents) => [...prevStudents, response.data]);
      setShowAddStudentForm(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const removeStudent = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/students/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  const addGrade = async (newGrade) => {
    try {
      const gradeData = {
        subject: newGrade.subject,
        grade: newGrade.grade,
        date: newGrade.date,
        student_id: selectedStudent.id,
      };
      const response = await axios.post('http://127.0.0.1:8000/grades/', gradeData);
      setGrades((prevGrades) => [...prevGrades, response.data]);
      setShowAddGradeForm(false);
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 min-h-screen p-6 bg-blue-600 shadow-lg text-white rounded-l-lg">
        <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
        <ul className="space-y-2">
          {teachers.map((teacher) => (
            <li
              key={teacher.id}
              className={`p-2 cursor-pointer transition-colors rounded-md ${selectedTeacher?.id === teacher.id ? 'bg-blue-300' : 'hover:bg-blue-500'}`}
              onClick={() => handleTeacherSelect(teacher)}
            >
              {teacher.name}
            </li>
          ))}
        </ul>
        <button
          className="absolute bottom-4 left-4 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Teachers' Dashboard</h1>

        {selectedTeacher && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Students</h2>
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddStudentForm(!showAddStudentForm)}
            >
              {showAddStudentForm ? 'Cancel' : 'Add Student'}
            </button>
            {showAddStudentForm && <StudentForm addStudent={addStudent} />}
            <ul className="list-disc pl-5 space-y-2">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="p-2 border rounded-md bg-white shadow hover:bg-gray-100 flex justify-between items-center"
                >
                  <span onClick={() => handleStudentSelect(student)}>
                    {student.name}
                  </span>
                  <button
                    className="ml-4 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    onClick={() => removeStudent(student.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedStudent && (
          <>
            <div className="mt-6 p-6 bg-blue-100 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Attendance</h2>
              {attendance.map((record) => (
                <div key={record.id} className="p-2 border rounded-md bg-gray-50">
                  <div>
                    <strong>Date:</strong> {record.attendance_date}
                  </div>
                  <div>
                    <strong>Status:</strong> {record.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-blue-100 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grades</h2>
              {grades.map((grade) => (
                <div key={grade.id} className="p-2 border rounded-md bg-gray-50">
                  <div>
                    <strong>Subject:</strong> {grade.subject}
                  </div>
                  < div>
                    <strong>Grade:</strong> {grade.grade}
                  </div>
                  <div>
                    <strong>Date:</strong> {grade.date}
                  </div>
                </div>
              ))}
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setShowAddGradeForm(!showAddGradeForm)}
              >
                {showAddGradeForm ? 'Cancel' : 'Add Grade'}
              </button>
              {showAddGradeForm && <AddGradeForm addGrade={addGrade} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeachersDashboard;