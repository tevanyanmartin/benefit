import { useEffect } from "react";
import New from "./component/section/New";
import Brands from "./component/section/Brands";
import Nav from "./component/menu/Nav";
import Main from "./component/section/Main";
import Footer from "./component/section/Footer";
import Login from "./component/menu/Login";
import Signup from "./component/menu/Signup";
import Brand from "./component/section/Brand";
import { useDispatch } from "react-redux";
import Bag from "./component/menu/Bag";
import Payment from "./component/section/Payment";
import Category from "./component/section/Category";
import LearnMore from "./component/section/LearnMore";
import "./styles/responsive.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  getBrandsActions,
  getCategoriesAction,
  getItemsActions,
  getNewItemsActions
} from "./reducer/asyncActions/firestoreActions";
import Favorites from "./component/menu/Favorites";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandsActions());
    dispatch(getCategoriesAction());
    dispatch(getItemsActions());
    dispatch(getNewItemsActions());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/new" component={New} />
          <Route exact path="/categories/:categoryId" component={Category} />
          <Route exact path="/brands" component={Brands} />
          <Route path="/brands/:brandId" component={Brand} />
          <Route exact path="/bag" component={Bag} />
          <Route path="/bag/payment" component={Payment} />
          <Route exact path="/learnmore/:itemId" component={LearnMore} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Main} />
          <Route exact path="/myFavorites" component={Favorites} />
          <Route exact path="/home" component={Main}>
            <Redirect to="/" />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
