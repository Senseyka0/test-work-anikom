import React from "react";

const NewsBlock = ({ imgUrl, title, descr, date }) => {
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
      </div>
   );
};

export default NewsBlock;
