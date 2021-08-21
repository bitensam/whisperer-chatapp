import React from 'react';
import { FaUserSecret, FaFacebook, FaGoogle } from 'react-icons/fa';
import loginBackground from '../../images/fakurian-design-bexwsdM5BCw-unsplash.jpg';
import './Login.css';
import 'firebase/app';
import { auth } from '../../Firebase/Firebase';
import firebase from 'firebase/app';

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
        <div
          className="login-button google"
          //Dodanie wywołania logowania autoryzacji google
          onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
        >
          <FaGoogle /> Sign In with Google
        </div>
        <br />
        <div
          className="login-button facebook"
          //Dodanie wywołania logowania autoryzacji facebook
          onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
        >
          <FaFacebook /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
