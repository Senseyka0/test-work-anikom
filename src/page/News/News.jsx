import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
   createNewUnapprovedNews,
   setNewImgUrl,
   setNewTitle,
   setNewDescr,
   clearInputs,
   setSearchValue,
} from "../../redux/reducers/news";

import NewsBlock from "./NewsBlock";

import "./News.scss";
import NewsBlockUnapproved from "./NewsBlockUnapproved";

const News = () => {
   const [isOpenPopup, setIsOpenPopup] = useState(false);

   const dispatch = useDispatch();

   const { news, newsItems, login } = useSelector((state) => ({
      news: state.news,
      newsItems: state.news.newsItems.filter((elem) =>
         elem.title.includes(state.news.searchValue)
      ),
      login: state.login,
   }));

   const changeVisibilityPopup = () => {
      setIsOpenPopup(!isOpenPopup);
   };

   const setImg = (img) => {
      dispatch(setNewImgUrl(img));
   };
   const setTitle = (title) => {
      dispatch(setNewTitle(title));
   };
   const setDescr = (descr) => {
      dispatch(setNewDescr(descr));
   };
   const changeSearchValue = (newValue) => {
      dispatch(setSearchValue(newValue));
   };

   const createUnapprovedNews = () => {
      dispatch(createNewUnapprovedNews(news.imgUrl, news.title, news.descr));
      dispatch(clearInputs());
      changeVisibilityPopup();
   };
   return (
      <div className="news">
         {news.unapprovedNews.length > 0 && login.user ? (
            <div className="news-unapproved">
               <h1 className="news-unapproved__title">Ждущие проверку новости</h1>
               <div className="news-unapproved__blocks">
                  {news.unapprovedNews.map((news) => (
                     <NewsBlockUnapproved key={news.id} {...news} />
                  ))}
               </div>
            </div>
         ) : (
            ""
         )}
         <div className="popup">
            <input
               className="popup__input input"
               type="text"
               value={news.searchValue}
               onChange={(e) => changeSearchValue(e.target.value)}
               placeholder="Введите название новости"
            />

            {login.user && (
               <button className="button" onClick={changeVisibilityPopup}>
                  Добавить новость
               </button>
            )}

            {isOpenPopup && login.user ? (
               <div className="popup-search">
                  <span
                     className="popup-search__close close"
                     onClick={changeVisibilityPopup}
                  >
                     X
                  </span>
                  <label className="popup-search__label" htmlFor="imgUrl">
                     Введите ссылку на картинку вашей новости
                  </label>
                  <input
                     className="popup-search__input input"
                     type="text"
                     id="imgUrl"
                     value={news.imgUrl}
                     onChange={(e) => setImg(e.target.value)}
                     autoFocus
                  />

                  <label className="popup-search__label" htmlFor="title">
                     Введите заголовок вашей новости
                  </label>
                  <input
                     className="popup-search__input input"
                     type="text"
                     id="title"
                     value={news.title}
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <label className="popup-search__label" htmlFor="descr">
                     Опишите вашу новость
                  </label>
                  <input
                     className="popup-search__input input"
                     type="text"
                     id="descr"
                     value={news.descr}
                     onChange={(e) => setDescr(e.target.value)}
                  />

                  <button
                     className="popup-search__button button"
                     onClick={createUnapprovedNews}
                  >
                     Отправить на проверку
                  </button>
               </div>
            ) : (
               ""
            )}
         </div>

         <div className="news-blocks">
            {newsItems.length > 0 ? (
               newsItems.map((item) => <NewsBlock key={item.id} {...item} />)
            ) : (
               <h1 className="news-blocks__empty">
                  По результатам вашего поиска ничего не найдено
               </h1>
            )}
         </div>
      </div>
   );
};

export default News;
