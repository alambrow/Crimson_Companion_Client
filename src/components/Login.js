import React, { useContext, useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from './providers/AuthProvider';

export const Login = (props) => {
    // const { login, token, currentUser } = useContext(AuthContext);

    const responseGoogle = (response) => {
      // login(response.profileObj)
      localStorage.setItem("crimson_token", 1)
      props.history.push("/")
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