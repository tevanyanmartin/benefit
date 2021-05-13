import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { db } from "../..";
import { SET_ITEMS_BY_CATEGORY } from "../../reducer/reducer";
import { selectCategoryById } from "../../selectors/firebase";
import Item from "./Item";
import SideBar from "./SideBar";
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: 95 + "%",
    margin: "auto",
    justifyContent: "space-between",
  },
  categoryItem: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "space-between",
    width: 82 + "%",
  },
  title: {
    display: "Block",
    width: "100%",
    borderBottom: "1px solid white",
    marginBottom: 25,
  },
  h1: {
    color: "white",
  },
});

const Category = () => {
  const classes = useStyles();
  const { categoryId } = useParams();
  const selectedCategory = useSelector(selectCategoryById(categoryId));
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!selectedCategory) return;
    const ref = db.collection("category").doc(selectedCategory.categoryId);
    db.collection("items")
      .where("categoryId", "==", ref)

      .get()
      .then((querySnapshot) => {
        const filteringItems = [];
        querySnapshot.forEach((item) => {
          filteringItems.push({ id: item.id, data: item.data() });
        });
        setFilteredItems(filteringItems);
        dispatch({
          type: SET_ITEMS_BY_CATEGORY,
          payload: filteringItems,
        });
        setTitle(selectedCategory.name);
      });
  }, [selectedCategory, dispatch]);

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.categoryItem}>
        <div className={classes.title}>
          <h1 className={classes.h1}>{title}</h1>
        </div>
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            {...item.data}
            itemId={item.id}
            url={categoryId}
          />
        ))}
      </div>
    </div>
  );
};
export default Category;
