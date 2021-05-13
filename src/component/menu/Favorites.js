import React, { useEffect, useState } from "react";
import "../../styles/bag.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../selectors/firebase";

import { makeStyles } from "@material-ui/core";
import produce from "immer";

import Item from "../section/Item";

const useStyles = makeStyles({
  root: {
    width: 85 + "%",
    margin: "auto",
    justifyContent: "space-between"
  },
  faveItem: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "space-between",
    width: 95 + "%"
  },
  title: {
    display: "Block",
    width: "100%",
    borderBottom: "1px solid white",
    marginBottom: 25
  },
  h1: {
    color: "white"
  },
  bagHeader: {
    textAlign: "center",
    borderBottom: "1px solid white",
    color: "white"
  },
  emptyFave: {
    textAlign: "center",
    position: "relative",
    height: "600px",
    width: "100%"
  },
  emptyFaveTitle: {
    color: "#ffffffab",
    position: "absolute",
    top: "30%",
    left: "30%",
    fontSize: "67px"
  }
});

const Favorites = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const history = useHistory();
  const [favorites, setFavorites] = useState([]);

  const emptyFave = (
    <div className={classes.emptyFave}>
      <h1 className={classes.emptyFaveTitle}>WISH LIST IS EMPTY</h1>
    </div>
  );

  useEffect(() => {
    if (user.data) {
      let clonedUserFave = produce(user, (draftUser) => {
        return draftUser.data.favorites;
      });
      setFavorites(clonedUserFave);
    }
  }, [user, history]);
  return (
    <div className={classes.root}>
      <div className={classes.bagHeader}>
        <h1> MY WISH LIST </h1>
      </div>
      <div className={classes.faveItem}>
        {favorites.length
          ? favorites.map((item, i) => (
              <Item key={item.itemId} ind={i} {...item} />
            ))
          : emptyFave}
      </div>
    </div>
  );
};

export default Favorites;
