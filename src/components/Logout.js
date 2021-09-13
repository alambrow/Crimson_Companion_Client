import { GoogleLogout } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
  }

const logoutSuccess = () => {
    alert('You have been logged out!')
}

export const Logout = () => {
    return (
        <GoogleLogout
        clientId="812910456899-89g2l108boob0jtkn1q3ph5tgs46vbkd.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
        onFailure={responseGoogle}
        >
      </GoogleLogout>
    )
}