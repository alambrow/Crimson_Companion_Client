import { Logout } from "./components/Logout";
import { Route } from "react-router-dom";
import { LandingSite } from "./components/LandingSite";
import { ProfileContext, ProfileProvider } from "./components/providers/ProfileProvider";
import { NavBar } from "./components/NavBar";

export const ApplicationViews = () => {

    return (
    <>
        <ProfileProvider>
            <Route exact path="/home">
                <LandingSite />
            </Route>
        </ProfileProvider>
    </>
    )
}