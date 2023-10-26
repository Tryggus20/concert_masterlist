import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import AboutPage from '../AboutPage/AboutPage';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='registerPage'>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
      <AboutPage />
    </div>
  );
}

export default RegisterPage;
