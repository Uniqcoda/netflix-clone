import React, { useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './index.css';

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log({ user });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log({ user });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type='email' placeholder='Email' name='email' id='email' />
        <input ref={passwordRef} type='password' placeholder='Password' name='password' id='password' />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className='signUpScreen__gray'>New to Netflix? </span>
          <span className='signUpScreen__link' onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
