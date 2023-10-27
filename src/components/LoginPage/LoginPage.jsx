import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import AboutPage from '../AboutPage/AboutPage';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='loginPage '>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
      <AboutPage />
      <br /><br /><br /><br /><br />
    </div>
  );
}

export default LoginPage;
