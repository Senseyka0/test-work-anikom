import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
   setEmail,
   setPassword,
   setHasAccount,
   setLogout,
   setVisibilityPopup,
} from "../../redux/reducers/login";

import { fetchAuthListener, fetchLogin, fetchSignUp } from "../../redux/reducers/login";

import "./LoginPopup.scss";

const LoginPopup = () => {
   const dispatch = useDispatch();

   const { login } = useSelector((state) => ({
      login: state.login,
   }));

   const closeVisibilityPopup = () => {
      dispatch(setVisibilityPopup(false));
   };
   const onVisibilityPopup = () => {
      dispatch(setVisibilityPopup(true));
   };

   const changeEmail = (value) => {
      dispatch(setEmail(value));
   };

   const changePassword = (value) => {
      dispatch(setPassword(value));
   };
   const changeHasAccount = () => {
      dispatch(setHasAccount(!login.hasAccount));
   };

   const handleLogin = () => {
      dispatch(fetchLogin(login.email, login.password));
   };

   const handleSignUp = () => {
      dispatch(fetchSignUp(login.email, login.password));
   };

   useEffect(() => {
      dispatch(fetchAuthListener());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className="popup">
         {login.user ? (
            <button className="popup__btn button" onClick={setLogout}>
               Выход
            </button>
         ) : (
            <button className="popup__btn button" onClick={onVisibilityPopup}>
               Вход
            </button>
         )}

         {login.isOpenPopup ? (
            <div className="popup__active">
               <span className="popup__active-close close" onClick={closeVisibilityPopup}>
                  X
               </span>
               <label className="popup__active-label" htmlFor="login">
                  Login
               </label>
               <input
                  className="popup__active-input input"
                  type="text"
                  id="login"
                  autoFocus
                  required
                  value={login.email}
                  onChange={(e) => changeEmail(e.target.value)}
               />
               <p className="popup__active-error-message">{login.emailError}</p>

               <label className="popup__active-label" htmlFor="password">
                  Password
               </label>
               <input
                  className="popup__active-input input"
                  type="password"
                  required
                  id="password"
                  value={login.password}
                  onChange={(e) => changePassword(e.target.value)}
               />
               <p className="popup__active-error-message">{login.passwordError}</p>

               {!login.hasAccount ? (
                  <>
                     <button
                        className="popup__active-button button"
                        onClick={handleLogin}
                     >
                        Войти
                     </button>
                     <p className="popup__active-text">
                        У вас нету аккаунта?
                        <span className="gold" onClick={changeHasAccount}>
                           Зарегестрироваться
                        </span>
                     </p>
                  </>
               ) : (
                  <>
                     <button
                        className="popup__active-button button"
                        onClick={handleSignUp}
                     >
                        Зарегестрироваться
                     </button>
                     <p className="popup__active-text">
                        У вас есть аккаунт?
                        <span className="gold" onClick={changeHasAccount}>
                           Войти
                        </span>
                     </p>
                  </>
               )}
            </div>
         ) : (
            ""
         )}
      </div>
   );
};

export default LoginPopup;
