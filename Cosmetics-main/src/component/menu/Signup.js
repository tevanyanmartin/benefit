import "../../styles/login.css";
import React, { useState } from "react";
import unKnown from "../../Pics/unknown.jpg";
import pLogo from "../../Pics/pink-logo.png";
import { db, auth } from "../../index";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [chosen, setChoose] = useState(unKnown);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    errorMessage: "",
    errorCode: "",
    sizeErrorMessage: ""
  });
  const generatePreviewImgUrl = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };
  let inputChange = { ...values };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else if (file.size >= 80000) {
      inputChange.sizeErrorMessage =
        "the size of the painting is large. choose less";
    } else {
      inputChange.sizeErrorMessage = "";
      generatePreviewImgUrl(file, (previewImgUrl) => {
        setChoose({ previewImgUrl });
      });
    }
    setValues(inputChange);
  };

  const handleInpChange = (e) => {
    if (e.target.type === "text") {
      inputChange.username = e.target.value;
    } else if (e.target.type === "password") {
      inputChange.password = e.target.value;
    } else if (e.target.type === "email") {
      inputChange.email = e.target.value;
    }
    setValues(inputChange);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        let user = userCredential.user;
        db.collection("users")
          .doc(user.uid)
          .set({
            username: inputChange.username,
            email: inputChange.email,
            image: chosen.previewImgUrl ? chosen.previewImgUrl : unKnown,
            bag: [],
            favorites: []
          })
          .then((docRef) => {
            inputChange.errorMessage = "";
            setValues(inputChange);
            history.push("/");
          })
          .catch((error) => {
            inputChange.errorMessage = error.message;
          });
      })

      .catch((error) => {
        inputChange.errorMessage = error.message;
        inputChange.errorCode = error.code;
        setValues(inputChange);
      });
  };
  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <div className="login-logo">
            <div className="logo">
              <a href="/">
                <img src={pLogo} alt={pLogo} />
              </a>
            </div>
          </div>
          <div className="login-form">
            <div className="form">
              <div className="chosen-img">
                <div className="chosen-img-content">
                  <img
                    src={chosen.previewImgUrl ? chosen.previewImgUrl : unKnown}
                    alt="user-img"
                  />
                </div>
                <span className="error-massage">
                  {values.sizeErrorMessage ? values.sizeErrorMessage : ""}
                </span>
              </div>
              <form onSubmit={handleSignUp}>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImgChange}
                  id="userImgInp"
                />
                <label htmlFor="userImgInp">Choose image</label>
                <input
                  type="text"
                  onChange={handleInpChange}
                  value={values.username}
                  placeholder="username"
                  required
                />
                <input
                  type="email"
                  onChange={handleInpChange}
                  value={values.email}
                  placeholder="E-mail"
                  required
                />
                <input
                  type="password"
                  onChange={handleInpChange}
                  value={values.password}
                  placeholder="password"
                  required
                />

                <span className="error-massage">
                  {values.errorMessage ? values.errorMessage : ""}
                </span>
                <input className="submit" type="submit" value="CREATE" />
              </form>
            </div>
          </div>
          <div className="in-login-create-newAcc-btn">
            <div className="create-newAcc-btn">
              <a href="/login">Log In</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
