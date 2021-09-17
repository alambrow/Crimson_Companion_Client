import { Route } from "react-router-dom";
import { LandingSite } from "./components/LandingSite";
import { ProfileProvider } from "./components/providers/ProfileProvider";
import { AllStudents } from "./components/AllStudents";
import { StudentProvider } from "./components/providers/StudentProvider";
import { NewStudent } from "./components/NewStudent";
import { NavBar } from "./components/NavBar";
import { StudentDetail } from "./components/StudentDetail";
import { EssayProvider } from "./components/providers/EssayProvider";
import { AllEssays } from "./components/AllEssays";
import { NewEssay } from "./components/NewEssay";

export const ApplicationViews = () => {

    return (
        <>
            <ProfileProvider>
                <StudentProvider>
                    <EssayProvider>
                        <NavBar />
                        <Route exact path="/home">
                            <LandingSite />
                        </Route>
                        <Route exact path="/students">
                            <AllStudents />
                        </Route>
                        <Route exact path="/students/:studentId(\d+)">
                            <StudentDetail />
                        </Route>
                        <Route exact path="/new_student">
                            <NewStudent />
                        </Route>
                        <Route exact path="/essays">
                            <AllEssays />
                        </Route>
                        <Route exact path="/new_essay">
                            <NewEssay />
                        </Route>
                    </EssayProvider>
                </StudentProvider>
            </ProfileProvider>
        </>
    )
}