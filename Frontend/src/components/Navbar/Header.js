import React, { useEffect, useState } from "react";
import "../NewNavbar.css";
import { NavLink } from "react-router-dom";
import $ from "jquery";
// import CloudIcon from "@mui/icons-material/Cloud";
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Fuse from "fuse.js";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Typography, Avatar } from "@material-ui/core";
import sitelogo from "../../icons/site-logo.png"


  // {
  //   Name: "Report",
  //   to: "/",
  //   icon: "bi bi-flag-fill",
  //   tag: ["core-team", "ngo", "company", "team"],
  // },


const Header = props => {

//   function animation() {
//     var tabsNewAnim = $("#navbarSupportedContent");
//     var activeItemNewAnim = tabsNewAnim.find(".active");
//     var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
//     var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
//     var itemPosNewAnimTop = activeItemNewAnim.position();
//     var itemPosNewAnimLeft = activeItemNewAnim.position();
//     $(".hori-selector").css({
//       top: itemPosNewAnimTop.top + "px",
//       left: itemPosNewAnimLeft.left + "px",
//       height: activeWidthNewAnimHeight + "px",
//       width: activeWidthNewAnimWidth + "px",
//     });
//     $("#navbarSupportedContent").on("click", "li", function (e) {
//       $("#navbarSupportedContent ul li").removeClass("active");
//       $(this).addClass("active");
//       var activeWidthNewAnimHeight = $(this).innerHeight();
//       var activeWidthNewAnimWidth = $(this).innerWidth();
//       var itemPosNewAnimTop = $(this).position();
//       var itemPosNewAnimLeft = $(this).position();
//       $(".hori-selector").css({
//         top: itemPosNewAnimTop.top + "px",
//         left: itemPosNewAnimLeft.left + "px",
//         height: activeWidthNewAnimHeight + "px",
//         width: activeWidthNewAnimWidth + "px",
//       });
//     });
//   }

//   useEffect(() => {
//     animation();
//     $(window).on("resize", function () {
//       setTimeout(function () {
//         animation();
//       }, 500);
//     });
//   }, []);

//   const fuse = new Fuse(pages, {
//     keys: ["tag"],
//     threshold: 0,
//   });

//   const q = sessionStorage.getItem("type");

//   const results = fuse.search(q);
//   const render_page = results.map((result) => result.item);

//   const clear = () => {
//     localStorage.removeItem("LoginStatus");
//     sessionStorage.removeItem("projectId");
//     sessionStorage.removeItem("ngoId");
//     sessionStorage.removeItem("moduleId");
//     sessionStorage.removeItem("companyId");
//   };
//   const clearSession = (e) => {
//     if (
//       e.target.textContent === "Teams" ||
//       e.target.textContent === "NGOs" ||
//       e.target.textContent === "Companies" ||
//       e.target.textContent === "Projects" ||
//       e.target.textContent === `${sessionStorage.getItem("entity")}`
//     ) {
//       clear();
//     }

//     if (e.target.textContent === "Log Out") {
//       localStorage.clear();
//       sessionStorage.removeItem("token");
//       clear();
//     }
//   };

    

    return (
      <nav className="navbar navbar-expand-lg navbar-mainbg" id="listIcon">
        <NavLink className="navbar-brand navbar-logo" to="/nav" exact>
          <FilterDramaIcon
            sx={{
              color: "black",
            }}
          />{" "}
          Badal
          <img
            src={process.env.PUBLIC_URL + "/image.png"}
            style={{ height: 35, width: 90, marginLeft: "12px" }}
          />
        </NavLink>
  
        {/* <button
          className="navbar-toggler"
          onClick={function () {
            setTimeout(function () {
              animation();
            });
          }}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list" color="#fff"></i>
        </button> */}
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </ul>
          {/* <div class="user-icon">
          <i class="bi bi-person-circle" ></i>
          </div>*/}
        </div>
      </nav>
    );
  };

export default Header;
