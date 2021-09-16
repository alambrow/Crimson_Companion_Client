import { Route } from "react-router-dom";
import { LandingSite } from "./components/LandingSite";
import { ProfileProvider } from "./components/providers/ProfileProvider";
import { AllStudents } from "./components/AllStudents";
import { StudentProvider } from "./components/providers/StudentProvider";
import { NewStudent } from "./components/NewStudent";
import { NavBar } from "./components/NavBar";

export const ApplicationViews = () => {

    return (
    <>
        <ProfileProvider>
            <StudentProvider>
                <NavBar />
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