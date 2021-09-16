import { Route } from "react-router-dom";
import { LandingSite } from "./components/LandingSite";
import { ProfileProvider } from "./components/providers/ProfileProvider";
import { AllStudents } from "./components/AllStudents";

export const ApplicationViews = () => {

    return (
    <>
        <ProfileProvider>
            <Route exact path="/home">
                <LandingSite />
            </Route>
            <Route exact path="/students">
                <AllStudents />
            </Route>
        </ProfileProvider>
    </>
    )
}