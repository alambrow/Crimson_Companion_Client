import './App.css';
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from './ApplicationViews';
import { Login } from './components/Login';
import { AuthProvider } from './components/providers/AuthProvider';

const CrimsonCompanionApp = () => (
  <>
    <AuthProvider>
      <Route render={() => {
          if (localStorage.getItem("crimson_token") !== null) {
            return <>
              <Route path="/" render={ApplicationViews}/>
            </>
          } else {
            return <Redirect to="/login" />
          }
      }} />

        <Route path="/login" render={Login} />
    </AuthProvider>
  </>
)

export default CrimsonCompanionApp