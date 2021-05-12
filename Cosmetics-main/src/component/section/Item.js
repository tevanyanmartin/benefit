import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../shared/Card";
import Button from "../shared/Button";
import CardMedia from "../shared/CardMedia";
import Typography from "../shared/Typography";
import {
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { storage } from "../..";
import "firebase/firestore";
import { selectUser } from "../../selectors/firebase";
import { useAlert } from "react-alert";
import { handleAddToBagItem } from "../../actions/functions";
import { handleAddToFavorites } from "../../actions/HandleAddToFavorites";
import FavoriteIcon from "@material-ui/icons/Favorite";
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles({
  new: {
    float: "right",
    color: "red"
  },
  card: {
    boxShadow: "0 0 6px 2px #f500cb87"
  }
});

const Item = (props) => {
  const classes = useStyles();
  const alertDraft = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [isFave, setIsFave] = useState(false);
  const [iconColor, setIconColor] = useState("action");
  const [img, setImg] = useState("");
  const { name, price, photo, status, itemId } = props;
  const getBrandLogo = async (photo) => {
    let data = await storage.refFromURL(photo).getDownloadURL();
    setImg(data);
  };
  useEffect(() => {
    getBrandLogo(photo);
  }, [photo]);
  useEffect(()=>{
    user.data.favorites.map((item)=>{
      if(item.itemId===itemId){
        setIconColor("secondary")
        setIsFave(true);
      }
    // (item.itemId===itemId?setIconColor("action"):)
  })
  },[])
  
  return (
    <Card className={classes.card}>
      <Typography className={classes.new}>{status}</Typography>
      <CardActionArea>
        <CardMedia img={img} />

        <CardContent>
          <Typography>{name}</Typography>
          <Typography>$ {price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          bgcolor="white"
          labelcolor="#4c003f"
          width="140px"
          border="none"
          onClick={() => {
            handleAddToBagItem(
              { ...props },
              user,
              alertDraft,
              dispatch,
              history
            );
          }}
        >
          Add to Bag
        </Button>
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
      </CardActions>
          
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            color={iconColor}
            onClick={() => {
              if (isFave) {
                setIconColor("action");
                setIsFave(false);
              } else {
                setIconColor("secondary");
                setIsFave(true);
              }
              handleAddToFavorites(
                { ...props },
                user,
                alertDraft,
                dispatch,
                history
              );
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Item;
