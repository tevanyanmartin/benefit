import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card as MaterialCard } from "@material-ui/core";
const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    height: 400,
    margin: "15px 5px 10px",
    display: "flex",
    flexWrap: "wrap"
  },
  media: {
    height: 200
  },
  typography: {
    color: "#4C003F"
  },
  buttonLabel: {
    color: "#4C003F"
  }
});
const Card = (props) => {
  const {
    width = "150px",
    children,
    className = "",
    ...rest
  } = props;
  const cardClasses = useStyles();
  return <MaterialCard 
  width={width}
  className={`${cardClasses.card} ${className}`}
  {...rest}
  >{children}</MaterialCard>;
};
export default Card;