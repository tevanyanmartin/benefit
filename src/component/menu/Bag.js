import React, { useEffect, useState } from "react";
import "../../styles/bag.css";
import { Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../selectors/firebase";
import BagItem from "./BagItem";
import { CardActions, CardContent, Button,Card } from "@material-ui/core";
import { useStylesForBag } from "./BagStyles";
import produce from "immer";

const Bag = () => {
  const user = useSelector(selectUser);
  const classes = useStylesForBag();
  const history = useHistory();
  const [bag, setBag] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const emptyBag = (
    <div className={classes.emptyBag}>
      <h1 className={classes.emptyBagTitle}>BAG IS EMPTY</h1>
    </div>
  );

  useEffect(() => {
    if (user.data) {
      let clonedUserBag = produce(user, (draftUser) => {
        return draftUser.data.bag;
      });
      setBag(clonedUserBag);
      let setPrice = 0;
      clonedUserBag.map((item) => {
        return (setPrice += +item.price);
      });
      setTotalPrice(setPrice);
    } else {
      history.push("/");
    }
  }, [user, history]);
  return (
    <div className={classes.bagComponent}>
      <div className={classes.bagHeader}>
        <h1> SHOPPING BAG {} </h1>
      </div>
      <div className={classes.paper}>
        <div className={`${classes.leftContent} for-scroll`}>
          <div className={classes.bagItems}>
            {bag.length
              ? bag.map((item, i) => (
                  <BagItem key={item.itemId} ind={i} {...item} />
                ))
              : emptyBag}
          </div>
        </div>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              ORDER SUMMARY
            </Typography>
            <br />
            <Typography component="p">SHIPPING - FREE</Typography>
            <br />
            <Typography component="p">TOTAL PRICE - $ {totalPrice}</Typography>
          </CardContent>
          <CardActions style={{ border: "1px solid black" }}>
            <Link to="/bag/payment">
              <Button size="small">CLICK TO ORDER</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Bag;
