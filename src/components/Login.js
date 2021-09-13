import React from 'react';
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

export const Login = () => {
    return (
        <GoogleLogin
        clientId="812910456899-89g2l108boob0jtkn1q3ph5tgs46vbkd.apps.googleusercontent.com"
        buttonText="Login using Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    )
}