import { GoogleLogin } from 'react-google-login';

export const Login = (props) => {

  const responseGoogle = (response) => {
    loginWithGoogleCredentials(response)
    props.history.push("/")
  }

  const loginWithGoogleCredentials = (response) => {
    return fetch(`http://127.0.0.1:8000/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(response.profileObj)
    })
    .then(res => res.json())
    .then(data => localStorage.setItem("crimson_token", data[0]))
  }

  const responseGoogle_error = () => {
      alert('Google could not verify your account.')
    }

  return (
      <>  
          <GoogleLogin
          clientId="812910456899-89g2l108boob0jtkn1q3ph5tgs46vbkd.apps.googleusercontent.com"
          buttonText="Login using Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle_error}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          /> 
      </>
    )
}