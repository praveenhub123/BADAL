import React, { useEffect, useState } from "react";
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";

import MenuItem from "./MenuItem";

export const menuItems = [
  // {
  //   name: "Dashboard",
  //   exact: true,
  //   to: "/dashboard",
  //   iconClassName: "bi bi-speedometer2",
  // },
  {
    name: "NGOs",
    exact: true,
    to: `/ngo`,
    iconClassName: "bi bi-building",
  },
  {
    name: "Team",
    exact: true,
    to: `/team`,
    iconClassName: "bi bi-people-fill",
  },
  { name: "Companies", to: `/companies`, iconClassName: "bi bi-building" },
  {
    name: "Projects",
    exact: true,
    to: `/projects`,
    iconClassName: "bi bi-bookmark-fill",
  },
  {
    name: "Log Out",
    exact: true,
    to: "/"
  }
  // { name: "Report", to: `/dashboard`, iconClassName: "bi bi-flag-fill" },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  const clear = () => {
    sessionStorage.removeItem("projectId")
    sessionStorage.removeItem("ngoId")
    sessionStorage.removeItem("moduleId")
    sessionStorage.removeItem("companyId")
  }

  const clearSession = (e) => {
    if (e.target.textContent === "Teams" ||
      e.target.textContent === "NGOs" ||
      e.target.textContent === "Companies" ||
      e.target.textContent === "Projects" ||
      e.target.textContent === `${sessionStorage.getItem("entity")}`
    ) {
      clear()
    }

    if (e.target.textContent === "Log Out") {
      sessionStorage.removeItem("token")
      clear()
    }
  }

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <WbCloudyRoundedIcon sx={{ fontSize: 46, color: "#7a9ff5" }} />
        </div>
        <span>Badal</span>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                clearSession(e)
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      {/* <div className="side-menu-footer">
        <div className="avatar">
          <i class="bi bi-person-circle"></i>
        </div>
        <div className="user-info">
          <h5>Shreyas Kumar</h5>
          <p>shreyaskr2000@gmail.com</p>
        </div>
      </div> */}
    </div>
  );
};

export default SideMenu;
