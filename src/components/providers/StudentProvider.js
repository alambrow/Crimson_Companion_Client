import { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = (props) => {
    const [students, setStudents] = useState([]);

    const getStudents = () => {
        return fetch("http://127.0.0.1:8000/students", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json())
            .then(setStudents);
    };

    const getStudentById = (studentId) => {
        return fetch(`http://127.0.0.1:8000/students/${studentId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    };

    const createStudent = (student) => {
        return fetch("http://127.0.0.1:8000/students", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(getStudents);
    };

    const deleteStudent = (studentId) => {
        return fetch(`http://127.0.0.1:8000/students/${studentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(getStudents);
    };

    const updateStudent = (student) => {
        return fetch(`http://127.0.0.1:8000/students/${student.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
            .then(getStudents);
    };

    return (
        <StudentContext.Provider value={{ students, getStudents, getStudentById, createStudent, deleteStudent, updateStudent }}>
            {props.children}
        </StudentContext.Provider>
    );
};