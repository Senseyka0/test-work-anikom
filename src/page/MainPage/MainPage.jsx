import React, { memo } from "react";
import { useSelector } from "react-redux";

import "./MainPage.scss";

const MainPage = memo(() => {
   const { login } = useSelector((state) => ({
      login: state.login,
   }));
   return (
      <div className="title">
         <h1 className="title__user">
            Привет, {login.user.displayName ? login.user.displayName : "Гость!"}
         </h1>
      </div>
   );
});

export default MainPage;
