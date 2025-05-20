// src/components/GoogleLoginButton.js

import React, { Component } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'; 
import callApi from "../../utils/apiCaller";
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class GoogleLoginButton extends Component {
  handleSuccess = async (response) => {
    const decoded = jwt_decode(response.credential);

    // Send the token to your server for further authentication
    const loginGoogle = await callApi("auth/login-google", "POST", {token: response.credential}, null);
    if (loginGoogle?.data?.token){
     await localStorage.setItem('_auth', loginGoogle.data.token);
        // toast.success('Login successful');
        // this.props.loginRequest(decoded);
        this.props.history.push('/');
        window.location.reload();
    }
    else {
      toast.error('Đăng nhập google thất bại');
    }
  };

  handleError = (error) => {
    console.error('Error:', error);
  };

  render() {
    return (
      <div className='google-button'>
        <GoogleLogin
          onSuccess={this.handleSuccess}
          onError={this.handleError}
        />
      </div>
    );
  }
}

export default withRouter(GoogleLoginButton);
