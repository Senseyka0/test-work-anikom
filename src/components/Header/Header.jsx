import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import Popup from "../LoginPopup/LoginPopup";

import "./Header.scss";

const Header = memo(() => {
   return (
      <header className="header">
         <ul className="nav-bar">
            <li className="nav-bar__link">
               <NavLink to="/">Главная</NavLink>
            </li>

            <li className="nav-bar__link">
               <NavLink to="/news">Новости</NavLink>
            </li>
         </ul>
         <Popup />
      </header>
   );
});

export default Header;
