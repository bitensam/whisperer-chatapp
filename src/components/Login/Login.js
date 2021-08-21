import React from 'react';
import { FaUserSecret, FaFacebook, FaGoogle } from 'react-icons/fa';
import loginBackground from '../../images/fakurian-design-bexwsdM5BCw-unsplash.jpg';
import './Login.css';

const Login = () => {
  return (
    <div id="login-page" className="login-page"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div id="login-card" className="login-card">
        <div className='login-card-logo'>
          <FaUserSecret />
        </div>
        <h2>Welcome to Whisperer</h2>
        <div className="login-button google">
          <FaGoogle /> Sign In with Google
        </div>
        <br />
        <br />
        <div className="login-button facebook">
          <FaFacebook /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
