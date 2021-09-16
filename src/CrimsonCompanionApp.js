import './App.css';
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from './ApplicationViews';
import { Login } from './components/Login';


const CrimsonCompanionApp = () => (
  <>
      <Route path="/" render={() => {
          if (localStorage.getItem("crimson_token")) {
            return <Redirect to="/home" />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/home" render={ApplicationViews}/>
  </>
)

export default CrimsonCompanionApp