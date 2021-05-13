import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import {
  selectItemById,
  selectNews,
  selectUser
} from "../../selectors/firebase";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../..";
import "firebase/firestore";
import Item from "./Item";
import { useHistory, useParams } from "react-router";
import { handleAddToBagItem } from "../../actions/functions";
import { useAlert } from "react-alert";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "50%",
    maxHeight: 1500
  },
  image: {
    width: 300,
    height: 500
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  button: {
    margin: theme.spacing(10, 0, 0, 0),
    width: 250
  },
  media: {
    height: 140
  }
}));
const LearnMore = () => {
  const alertDraft = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const classes = useStyles();
  const { itemId } = useParams();
  const selectedItem = useSelector(selectItemById(itemId));
  const news = useSelector(selectNews);
  const [img, setImg] = useState("");
  let newArrayItems = [...news];
  const shuffled = newArrayItems.sort(() => 0.5 - Math.random());
  let newArray = shuffled.slice(0, 3);
  useEffect(() => {
    const getBrandLogo = async (photo) => {
      let data = await storage.refFromURL(photo).getDownloadURL();
      setImg(data);
    };
    getBrandLogo(selectedItem ? selectedItem.photo : "");
    return selectedItem;
  }, [selectedItem]);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {selectedItem ? selectedItem.name : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Brand
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  $ {selectedItem ? selectedItem.price : ""}
                </Typography>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={() => {
                    handleAddToBagItem(
                      { ...selectedItem },
                      user,
                      alertDraft,
                      dispatch,
                      history
                    );
                  }}
                >
                  ADD TO BAG
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {newArray.map((item, i) => (
          <Item key={item.itemId} ind={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
