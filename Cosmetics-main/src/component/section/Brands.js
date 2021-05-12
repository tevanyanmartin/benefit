import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../../styles/BrandsStyle.css";
import { Grid, Paper, Typography, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import Button from "../shared/Button";
import { selectBrands } from "../../selectors/firebase";
import { storage } from "../../";
const Brands = () => {
  const brands = useSelector(selectBrands);
  const { url } = useRouteMatch();
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    async function getImgUrl(path) {
      let gsReference = storage.refFromURL(path);
      return gsReference.getDownloadURL();
    }
    const getBrandLogos = async (brands) => {
      const imageArray = [];
      brands.forEach((brand) => {
        imageArray.push(getImgUrl(brand.logo));
      });
      const data = await Promise.all(imageArray);
      setLogos(data);
    };
    getBrandLogos(brands);
  }, [brands]);

  return (
    <div className="brands-main-content">
      <div className="brands-content">
        {brands.map((brand, i) => (
          <div key={i} className="root">
            <Paper className="paper">
              <Grid container className="main-grid">
                <Grid className="image-grid">
                  <ButtonBase className="image-btn">
                    <Link to={`${url}/${brand.brandId}`}>
                      <img
                        style={{ width: 300, height: 300 }}
                        src={logos[i]}
                        alt=""
                      />
                    </Link>
                  </ButtonBase>
                </Grid>
                <Grid className="desc-grid">
                  <Typography className="description" variant="subtitle1">
                    {brand.label}
                  </Typography>
                  <Grid className="typo-grid">
                    <Typography className="description" variant="subtitle1">
                      {brand.description}
                    </Typography>
                  </Grid>
                  <Grid className="grid-btn">
                    <Link to={`${url}/${brand.brandId}`} className="brand-link">
                      <Button variant="contained">{brand.label}</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Brands;
