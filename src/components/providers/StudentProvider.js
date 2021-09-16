import { createContext, useState } from "react";

export const StudentContext = createContext()

export const StudentProvider = (props) => {
    const [ students, setStudents ] = useState([]);
    
    const getStudents = () => {
        return fetch("http://127.0.0.1:8000/students", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
        .then(res => res.json())
        .then(setStudents)
    }

    return (
        <StudentContext.Provider value={{ students, getStudents}}>
            {props.children}
        </StudentContext.Provider>
    )
}