import { useContext, useEffect } from "react"
import { StudentContext } from "./providers/StudentProvider"


export const AllStudents = () => {
    const { students, getStudents } = useContext(StudentContext);

    useEffect(() => {
        getStudents()
    }, [])

    const renderStudentItem = student => {
        return (
            <div className="student_item">
                {student.full_name}
                <br/>
                {student.email}
                <br/>
                {student.drive_url}
                <br/><br/>
            </div>
        )
    }

    return (
        <>
            <main>
                <div className="students_page_all">
                    <h3>Current Students</h3>
                    {
                        students.map(student => renderStudentItem(student))
                    }
                </div>
            </main>
        </>
    )
}