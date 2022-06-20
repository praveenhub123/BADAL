import "./SideBarNew.css";
import SideMenu, { menuItems } from "./SideMenu";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingLeft: 280,
  paddingTop: 64,
}));

export const SideBarNew = (props) => {
  const { children } = props;
  const [inactive, setInactive] = useState(false);

  return (
    <div className="App">
      <SideMenu
        onCollapse={(inactive) => {
          console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        {children}
      </div>
    </div>
  );
};
