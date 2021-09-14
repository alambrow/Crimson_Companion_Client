import { Logout } from "./components/Logout";
import { Route } from "react-router-dom";

export const ApplicationViews = () => {

    return (
    <>
        <Route exact path="/home">
            <Logout />
            <h1>Landing Site</h1>
        </Route>

    </>
    )
}