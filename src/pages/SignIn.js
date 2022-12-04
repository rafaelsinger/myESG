import React from 'react'
import { auth } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigate('/home');
            // const user = userCredential.user;
            // alert(`email: ${user.email}, display name: ${user.displayName}`)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
      });
    }
    return (
    <div className="sign-in-background">
        <div className='sign-in-container'>
            <h1 className="sign-in-header">Register:</h1>
            <div>
                <input className="sign-in-input" type="text" onChange={(e) => setEmail(e.target.value)} id="email" placeholder='Email'/>
            </div>
            <div>
                <input className="sign-in-input" type="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder='Password'/>
            </div>
            <button type="submit" className="submit-button" onClick={signUp}>Submit</button>
            <div className='sign-in-redirect'>Already have an account?<a href="/signin">Sign in.</a></div>
        </div>
    </div>
  )
}

export default SignIn