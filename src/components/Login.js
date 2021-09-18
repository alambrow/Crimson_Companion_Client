import { GoogleLogin } from 'react-google-login';
import CrimsonIcon from './images/crimson_icon.jpg';
import './styles/login.css';

export const Login = (props) => {

  const loginWithGoogleCredentials = (response) => {
    return fetch(`http://127.0.0.1:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(response.profileObj)
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid && data.token) {
          localStorage.setItem("crimson_token", data.token)
          props.history.push("/home")
        } else {
          alert("Login failed.")
        }
      })
  }

  const responseGoogle_error = () => {
    alert('Google could not verify your account.')
  }

  return (
    <>
      <main>
        <div className="login__full_panel">
          <div className="login__welcome_banner">
            Crimson Companion App
            </div>
            <div className="login__banner_undertitle">
              An Organizer for College Application Consultants
            </div>
          
          <div className="login__bottom_flex">
            <div className="login__logo">
            <img src={CrimsonIcon} justify-content="center" width="100" height="100" />
            </div>
            <div className="login__button">
            <GoogleLogin
              clientId="812910456899-89g2l108boob0jtkn1q3ph5tgs46vbkd.apps.googleusercontent.com"
              buttonText="Login using Google"
              onSuccess={loginWithGoogleCredentials}
              onFailure={responseGoogle_error}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}