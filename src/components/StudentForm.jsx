import React, { useState } from 'react';

const StudentForm = ({ addStudent }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            addStudent({ name });
            setName(''); // Reset the form
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex">
            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-2 flex-1 mr-2"
                required
            />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Add
            </button>
        </form>
    );
};

export default StudentForm;
