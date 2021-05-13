import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { db } from "../..";
import { SET_ITEMS_BY_BRAND } from "../../reducer/reducer";
import { selectBrandById } from "../../selectors/firebase";
import Item from "./Item";
import SideBar from "./SideBar";
import { useParams } from "react-router";
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: 95 + "%",
    margin: "auto",
    justifyContent: "space-between"
  },
  brandItem: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "space-between",
    width: 82 + "%"
  },
  title: {
    display: "Block",
    width: "100%",
    borderBottom: "1px solid white",
    marginBottom: 25
  },
  h1: {
    color: "white"
  }
});

const Brand = () => {
  const classes = useStyles();
  const { brandId } = useParams();
  const selectedBrand = useSelector(selectBrandById(brandId));
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (!selectedBrand) return;
    const ref = db.collection("brands").doc(selectedBrand.brandId);
    db.collection("items")
      .where("brandId", "==", ref)
      .get()
      .then((querySnapshot) => {
        let filteringItems = [];
        querySnapshot.forEach((item) => {
          filteringItems.push({ id: item.id, data: item.data() });
        });
        setFilteredItems(filteringItems);
        dispatch({
          type: SET_ITEMS_BY_BRAND,
          payload: filteringItems
        });
        setTitle(selectedBrand.name);
      });
  }, [selectedBrand, dispatch]);
  return (
    <>
      <div className={classes.root}>
        <SideBar />
        <div className={classes.brandItem}>
          <div className={classes.title}>
            <h1 className={classes.h1}>{title}</h1>
          </div>
          {filteredItems.map((item) => (
            <Item key={item.id} {...item.data} itemId={item.id} url={brandId} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Brand;
