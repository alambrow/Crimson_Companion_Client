import { createContext, useState } from "react";

export const EssayContext = createContext();

export const EssayProvider = (props) => {
    const [essays, setEssays] = useState([]);

    const getEssays = () => {
        return fetch("http://127.0.0.1:8000/essays", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json())
            .then(setEssays);
    }

    const getEssayById = (essayId) => {
        return fetch(`http://127.0.0.1:8000/essays/${essayId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    }

    const getUpcomingEssays = (dialInt) => {
        return fetch(`http://127.0.0.1:8000/essays?upcoming=${dialInt}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    }

    const getUpcomingEssaysInDateRange = (day) => {
        return fetch(`http://127.0.0.1:8000/essays?day=${day}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    }

    const getEssaysByStudentId = (studentId) => {
        return fetch(`http://127.0.0.1:8000/essays?student=${studentId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    }

    const createEssay = (essay) => {
        return fetch("http://127.0.0.1:8000/essays", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(essay)
        })
            .then(res => res.json())
            .then(getEssays);
    }

    const deleteEssay = (essayId) => {
        return fetch(`http://127.0.0.1:8000/essays/${essayId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
    }

    const updateEssay = (essay) => {
        return fetch(`http://127.0.0.1:8000/essays/${essay.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(essay)
        })
            .then(getEssays);
    }

    const getCompleteEssaysByStudentId = (studentId) => {
        return fetch(`http://127.0.0.1:8000/essays?student=${studentId}&is_complete=True`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(res => res.json());
    }

    return (
        <EssayContext.Provider value={{ getEssays, essays, getEssayById, getEssaysByStudentId, createEssay, deleteEssay, updateEssay, getUpcomingEssays, getUpcomingEssaysInDateRange, getCompleteEssaysByStudentId }}>
            {props.children}
        </EssayContext.Provider>
    )
}