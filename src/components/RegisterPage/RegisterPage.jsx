import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import AboutPage from "../AboutPage/AboutPage";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="registerPage">
      <RegisterForm />
      <center>
        <button
          type="button"
          className="button"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </button>
      </center>
      <AboutPage />
      <br /> <br />
      <br />
      <br />
      <br/>
    </div>
  );
}

export default RegisterPage;
