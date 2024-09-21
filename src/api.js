// src/api.js
const API_BASE_URL = 'http://localhost:8000'; // Adjust based on your FastAPI server URL

// Fetch all students
export const fetchStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students/`);
  return await response.json();
};

// Add a student
export const addStudent = async (student) => {
  const response = await fetch(`${API_BASE_URL}/students/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  return await response.json();
};

// Update student grades
export const updateStudentGrades = async (studentId, grades) => {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/grades/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ grades }),
  });
  return await response.json();
};

// Update student attendance
export const updateStudentAttendance = async (studentId, attendance) => {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/attendance/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attendance }),
  });
  return await response.json();
};

// Add other API functions for teachers and principals as needed
