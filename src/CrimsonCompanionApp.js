import './App.css';
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from './ApplicationViews';
import { Login } from './components/Login';


const CrimsonCompanionApp = () => (
  <>
      <Route render={() => {
          if (localStorage.getItem("crimson_token")) {
            return <>
              <Route path="/" render={ApplicationViews}/>
            </>
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/login" render={Login} />
  </>
)

export default CrimsonCompanionApp