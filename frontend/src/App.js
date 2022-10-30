import "./App.css";
import axios from "axios";
import { useEffect,useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import NotFound from "./component/layout/Not Found/NotFound.js";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);

  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getStripeApiKey();
    store.dispatch(loadUser());
    //eslint-disable-next-line 
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />}/>
        <Route exact path="/cart" element={<Cart />} />
        {isAuthenticated && (<Route exact path="/account" element={<Profile />} />)}
        {isAuthenticated && (<Route exact path="/me/update" element={<UpdateProfile />} />)}
        {isAuthenticated && (<Route exact path="/password/update" element={<UpdatePassword />} />)}
        {isAuthenticated ? (<Route exact path="/shipping" element={<Shipping />} />) : (<Route path="/shipping" element={<LoginSignUp />} />)}
        {isAuthenticated && (<Route exact path="/success" element={<OrderSuccess/>}/>)}
        {isAuthenticated && (<Route exact path="/order/confirm" element={<ConfirmOrder />} />)}
        {isAuthenticated && (<Route exact path="/orders/me" element={<MyOrders/>}/>)}
        {isAuthenticated && (<Route exact path="/order/:id" element={<OrderDetails/>} />)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/dashboard" element={<Dashboard/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/products" element={<ProductList/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/product" element={<NewProduct/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/product/:id" element={<UpdateProduct/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/orders" element={<OrderList/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/order/:id" element={<ProcessOrder/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/users" element={<UsersList/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/user/:id" element={<UpdateUser/>}/>)}
        {isAuthenticated && (<Route isAdmin={true} exact path="/admin/reviews" element={<ProductReviews/>}/>)}
        {isAuthenticated && (<Route exact path="/payment/process" element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
          </Elements>
        }/>)}
        <Route element={window.location.pathname === "/process/payment" ? null : <NotFound/>}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
