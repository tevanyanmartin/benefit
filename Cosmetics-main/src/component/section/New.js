import "../../styles/NewStyle.css";
import { selectNews } from "../../selectors/firebase";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import SideBar from "./SideBar";
import Item from "./Item";
const useStyles = makeStyles({
  brandRoot: {
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
  }
});
const New = () => {
  const brandClasses = useStyles();
  const news = useSelector(selectNews);
  return (
    <div className={brandClasses.brandRoot}>
      <SideBar />
      <div className={brandClasses.brandItem}>
        {news.map((item) => (
          <Item key={item.itemId} {...item} />
        ))}
      </div>
    </div>
  );
};
export default New;
