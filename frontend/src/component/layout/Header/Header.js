import React from "react";
import { ReactNavbar } from "overlay-navbar";
import "./Header.css"
import icon from "../../../images/Appstore.png"
const options = {
  burgerColor:"red",
  burgerColorHover: "#eb4034",
  logo:"https://www.lunapic.com/editor/premade/transparent.gif",
  logoWidth: "15vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Search",
  link4Text: "Login",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/search",
  link4Url: "/login",
  link1Size: "1.5vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav3justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  // searchIcon:true,
  // SearchIconElement:icon,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />
};

export default Header;
