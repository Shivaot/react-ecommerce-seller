import React, { useEffect } from 'react';

import './AuthPage.styles.scss';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
const AuthPage = () => {
   
    return (
      <>
            <h2><u>Welcome to Seller Portal</u></h2><br />
            <div className="auth-page">
                <SignIn />
                <span style={{borderRight: "2px solid grey"}}></span>
                <SignUp />
            </div> 
      </>     
    );
};

export default AuthPage;