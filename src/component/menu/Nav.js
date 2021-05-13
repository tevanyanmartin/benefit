import "../../styles/nav.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wLogo from "../../Pics/white-logo.png";
import NavModules from "./NavModules";
import { auth, db } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../../reducer/reducer";
import {
  selectBagCount,
  selectCategories,
  selectUser
} from "../../selectors/firebase";
import bagIcon from "../../Pics/bag.png";
import faveIcon from "../../Pics/icons/heart.png";
function Nav() {
  const categories = useSelector(selectCategories);
  const bagCount = useSelector(selectBagCount);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [displayNone, setDisplay] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [userImg, setImg] = useState("");

  const handleToggle = (e) => {
    setDisplay(displayNone ? false : true);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        setUid(user.uid);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch({
                type: SET_USER,
                payload: {
                  data: doc.data(),
                  uid: user.uid
                }
              });
              setImg(doc.data().image);
            }
          });
      }
    });
  }, [dispatch]);

  let bagItemIcon = "";
  if (user.data) {
    bagItemIcon = (
      <div className="div-bag-icon">
        <span className="bag-count">{bagCount}</span>
        <Link className="navbar-menu-a" to="/bag">
          <img src={bagIcon} alt="" />
        </Link>
      </div>
    );
  }

  let faveItemIcon = "";
  if (user.data) {
    faveItemIcon = (
      <div className="profile-items">
        <div className="div-bag-icon">
          <Link className="navbar-menu-a" to="/myFavorites">
            <img src={faveIcon} alt="" />
          </Link>
        </div>
      </div>
    );
  }

  const navModules = (
    <NavModules
      handleToggle={handleToggle}
      userImg={userImg}
      email={email}
      uid={uid}
    />
  );

  return (
    <div className="page-navigation">
      <div className="page-container">
        <div className="navbar-mobile"></div>
        <div className="navbar-desktop">
          <Link className="navbar-desktop-a" to="/">
            <img alt="img" src={wLogo} />
          </Link>
          <div className="navbar-menu">
            <Link className="navbar-menu-a" to="/new">
              New
            </Link>
            {categories.map((category, i) => (
              <Link
                className="navbar-menu-a"
                key={i}
                to={`/categories/${category.categoryId}`}
              >
                {category.type}
              </Link>
            ))}
            <Link className="navbar-menu-a" to="/brands">
              Brands
            </Link>
          </div>

          <div className="profile-items">
            {faveItemIcon}
            {bagItemIcon}
            <span
              onClick={handleToggle}
              id="profile-items"
              className="profile-items-span"
            >
              {email ? email : "My account"}{" "}
            </span>
          </div>
        </div>
        {displayNone ? navModules : ""}
        <div
          onClick={handleToggle}
          style={{ display: displayNone ? "block" : "none" }}
          className="close-dropDown"
        ></div>
      </div>
    </div>
  );
}
export default Nav;
