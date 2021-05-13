import React from "react";
import { useSelector } from "react-redux";
import { ListItem, makeStyles } from "@material-ui/core";
import { selectBrands } from "../../selectors/firebase";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  sidebar: {
    width: 220,
    background:
      "radial-gradient(ellipse farthest-side at left top,#f500cb70 13%, rgb(255 255 255 / 0%) 90%)",
    borderLeft: "1px solid #f500cb",
  },
  brandsSelector: {
    margin: 10 + "px auto",
    width: 90 + "%",
  },
  brands: {
    marginTop: 12,
  },
  h3: {
    borderBottom: 1 + "px solid",
    fontSize: 25,
    cursor: "pointer",
    color: "white",
  },
  p: {
    marginTop: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
});
const SideBar = () => {
  const classes = useStyles();
  const brands = useSelector(selectBrands);
  return (
    <>
      <div className={classes.sidebar}>
        <div className={classes.brandsSelector}>
          <h3 className={classes.h3}>Brands</h3>
          <div className={classes.brands}>
            {brands.map((brand, i) => (
              <ListItem button key={i}>
                <Link className={classes.link} to={`/brands/${brand.brandId}`}>
                  {brand.label}
                </Link>
              </ListItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
