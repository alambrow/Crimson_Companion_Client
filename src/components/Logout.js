import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router';


export const Logout = (props) => {
  const history = useHistory()

  const logoutSuccess = () => {
      localStorage.removeItem('crimson_token')
      history.push("/login")
    }

  return (
          <GoogleLogout
          clientId="812910456899-89g2l108boob0jtkn1q3ph5tgs46vbkd.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logoutSuccess}
          >
        </GoogleLogout>
      )
}