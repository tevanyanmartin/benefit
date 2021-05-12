import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia as MaterialCardMedia } from "@material-ui/core";
import item from "../../Pics/icons/item.png";
const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200,
    margin: "auto"
  }
});

const MediaCard = (props) => {
  const {
    img = item,
    title = "item",
    ...rest
  } = props;
  const cardMediaClasses = useStyles();
  return (
    <MaterialCardMedia
      component='img'
      className={cardMediaClasses.media}
      image={img}
      title={title}
      {...rest}
    />
  );
};
export default MediaCard;
