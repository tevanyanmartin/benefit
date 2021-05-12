import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Accordion,
  Typography,
  Chip,
  Button,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStylesForBagItem } from "./BagStyles";
import { db, storage } from "../..";
import firebase from "firebase/app";
import "firebase/firestore";
import { selectUser } from "../../selectors/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import produce from "immer";
import { SET_USER } from "../../reducer/reducer";
const BagItem = (props) => {
  const dispatch = useDispatch();
  const classes = useStylesForBagItem();
  const { name, price, photo, itemId } = props;
  const user = useSelector(selectUser);
  const [img, setImg] = useState("");
  const alert = useAlert();
  const getBrandLogo = async (photo) => {
    let data = await storage.refFromURL(photo).getDownloadURL();
    setImg(data);
  };
  useEffect(() => {
    getBrandLogo(photo);
  }, [photo]);
  function handleDeleteFromBag(itemId, user) {
    db.collection("users")
      .doc(user.uid)
      .update({
        bag: firebase.firestore.FieldValue.arrayRemove(
          user.data.bag.find((item) => item.itemId === itemId)
        )
      })
      .then(() => {
        let payload = produce(user, (draftUser) => {
          let result = draftUser.data.bag.findIndex(function (bagItem) {
            return bagItem.itemId === itemId;
          });
          draftUser.data.bag.splice(result, 1);
        });
        dispatch({
          type: SET_USER,
          payload
        });
        alert.show(
          <div style={{ color: "white", fontSize: "12px" }}>
            'Successfully deleted !'
          </div>
        );
      });
  }

  return (
    <div className={classes.root}>
      <Fragment>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>{name}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                $ {price}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <div className={classes.imgDiv}>
                <img className={classes.img} src={img} alt="" />
              </div>
            </div>
            <div className={classes.column}>
              <Chip
                label="Remove from bag"
                onClick={() => {
                  handleDeleteFromBag(itemId, user);
                }}
              />
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your beauty products
                <br />
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Link to={`/learnmore/${itemId}`}>
              <Button
                bgcolor="white"
                labelcolor="#4c003f"
                width="140px"
                border="none"
              >
                Learn More
              </Button>
            </Link>
          </AccordionActions>
        </Accordion>
      </Fragment>
    </div>
  );
};
export default BagItem;
