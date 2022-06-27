import React from "react";
import "../NewNavbar.css";
import { NavLink } from "react-router-dom";
import FilterDramaIcon from '@mui/icons-material/FilterDrama';


const Header = props => {
    
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </ul>
          
        </div>
      </nav>
    );
  };

export default Header;
