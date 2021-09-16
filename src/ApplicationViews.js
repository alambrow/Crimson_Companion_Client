import { Route } from "react-router-dom";
import { LandingSite } from "./components/LandingSite";
import { ProfileProvider } from "./components/providers/ProfileProvider";
import { AllStudents } from "./components/AllStudents";
import { StudentProvider } from "./components/providers/StudentProvider";
import { NewStudent } from "./components/NewStudent";

export const ApplicationViews = () => {

    return (
    <>
        <ProfileProvider>
            <StudentProvider>
                <Route exact path="/home">
                    <LandingSite />
                </Route>
                <Route exact path="/students">
                    <AllStudents />
                </Route>
                <Route exact path="/new_student">
                    <NewStudent />
                </Route>
            </StudentProvider>
        </ProfileProvider>
    </>
    )
}