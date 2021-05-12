import "../../styles/login.css";
import React, { useState } from "react";
import pLogo from "../../Pics/pink-logo.png";
import { useHistory } from "react-router-dom";
import { db, auth } from "../../index";
import { Link } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    errorMessage: "",
    errorCode: ""
  });
  let submitNewValues = { ...values };

  const handleChange = (e) => {
    if (e.target.type === "email") {
      submitNewValues.email = e.target.value;
    } else if (e.target.type === "password") {
      submitNewValues.password = e.target.value;
    }
    setValues(submitNewValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        let user = userCredential.user;
        db.collection("users")
          .get(user.uid)
          .then((querySnapshot) => {
            submitNewValues.errorMessage = " ";
            history.push("/");
          });
      })
      .catch((error) => {
        submitNewValues.errorCode = error.code;
        submitNewValues.errorMessage = error.message;
        setValues(submitNewValues);
        console.log(error.code, error.message);
      });
  };

  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <div className="login-logo">
            <div className="logo">
              <Link to="/">
                <img src={pLogo} alt={pLogo} />
              </Link>
            </div>
          </div>
          <div className="login-form">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <span className="error-massage">
                  {values.errorMessage ? values.errorMessage : ""}
                </span>
                <input className="submit" type="submit" value="LOG IN" />
              </form>
            </div>
          </div>
          <div className="in-login-create-newAcc-btn">
            <div className="create-newAcc-btn">
              <a href="/signup">Create a new account</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
