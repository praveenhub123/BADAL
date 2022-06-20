import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const MenuItem = (props) => {
  const { name, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick}>
      <Link exact to={to} className={`menu-item`}>
        <div className="menu-icon">
          <i class={iconClassName}></i>
        </div>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
