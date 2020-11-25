import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewNews, deleteNewNews } from "../../redux/reducers/news";

const NewsBlockUnapproved = ({ id, imgUrl, title, descr, date }) => {
   const dispatch = useDispatch();

   const { login } = useSelector((state) => ({
      login: state.login,
   }));

   const createNews = () => {
      dispatch(createNewNews(id));
      dispatch(deleteNewNews(id));
   };

   const deleteNews = () => {
      dispatch(deleteNewNews(id));
   };

   return (
      <div className="block-item">
         <div className="block-item__img">
            <img src={imgUrl} alt="News" />
         </div>
         <div className="block-item__info">
            <h3 className="info__title">{title}</h3>
            <p className="info__descr">{descr}</p>
            <div className="info__date">{date}</div>
         </div>
         {login.user.displayName === "Михаил" && (
            <div className="admin-panel">
               <span className="admin-panel__confirm" onClick={createNews}>
                  Подтвердить
               </span>
               <span className="admin-panel__delete" onClick={deleteNews}>
                  Удалить
               </span>
            </div>
         )}
      </div>
   );
};

export default NewsBlockUnapproved;
