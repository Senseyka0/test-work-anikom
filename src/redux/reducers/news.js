const initialState = {
   newsItems: [
      {
         id: 1,
         imgUrl: "https://img.gazeta.ru/files3/426/12272426/99-pic905-895x505-11108.jpg",
         title: "Новый взрыв на Чернобыле. Людей начали евакуюировать",
         descr:
            "29 ноября стался новый взрыв на ЧАЭС. Об этом сообщил Президент Украины В.В Зеленский",
         date: "07/30/2019",
      },
      {
         id: 2,
         imgUrl:
            "https://file.liga.net/images/general/2019/05/13/20190513142910-7687.jpg?v=1557752968",
         title:
            "Илон Маск рассказал что в детстве он хотел стать Front-end разработчиком",
         descr:
            "Илон Маск поделился с прессой, что в юном возрасте он мечтал стать 'Front-end разработчиком' в компании 'Profilance Group'",
         date: "11/07/2020",
      },
      {
         id: 3,
         imgUrl: "https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/280/656/6.jpg",
         title: "На завтра обещают сильный снегопад. Запасайтесь теплой одеждой",
         descr:
            "Синоптики обещают на завтра минусовую погоду, та сильный снег. Так что доставайте свои зимные куртки :)",
         date: "09/01/2020",
      },
      {
         id: 4,
         imgUrl:
            "https://images11.esquire.ru/upload/img_cache/acf/acfbe9979332a4bab9cec3485f678f61_ce_1080x673x0x0_cropped_960x600.jpg",
         title:
            "Известный кот под именем 'Шон' родил котика, которму дали название 'Фича'",
         descr:
            "Владелец известного всем кота 'Шон', придумал необычное название, для нового любимица публики.",
         date: "07/30/2019",
      },
      {
         id: 5,
         imgUrl:
            "https://cdn24.img.ria.ru/images/07e4/03/0c/1568489701_0:70:3028:1773_600x0_80_0_0_25fdefd14d416ace371cfb6e87b05c44.jpg",
         title:
            "Футбольная команда 'Реал Мадрид' выиграли в третий раз подряд Лигу Чемпионов",
         descr:
            "Футбольная команда 'Реал Мадрид' выиграли в третий раз подряд Лигу Чемпионов, и становятся абсолютными рекордсменами этого престижного кубка",
         date: "07/30/2019",
      },
   ],
   unapprovedNews: [],

   imgUrl: "",
   title: "",
   descr: "",
   date: "",

   searchValue: "",
};

const news = (state = initialState, action) => {
   switch (action.type) {
      case "CLEAR_INPUTS":
         return {
            ...state,
            imgUrl: "",
            title: "",
            descr: "",
            date: "",
         };

      case "CREATE_NEW_NEWS": {
         const newUnapprovedNews = state.unapprovedNews.find(
            (elem) => elem.id === action.payload
         );

         return {
            ...state,
            newsItems: [...state.newsItems, newUnapprovedNews],
         };
      }
      case "DELETE_NEW_NEWS":
         const unapprovedNews = state.unapprovedNews.filter(
            (elem) => elem.id !== action.payload
         );
         return {
            ...state,
            unapprovedNews: unapprovedNews,
         };

      case "CREATE_NEW_UNAPPROVED_NEWS": {
         let today = new Date();
         let dd = String(today.getDate()).padStart(2, "0");
         let mm = String(today.getMonth() + 1).padStart(2, "0");
         let yyyy = today.getFullYear();

         today = mm + "/" + dd + "/" + yyyy;

         const newNews = {
            id: Math.random(),
            imgUrl: action.payload.img,
            title: action.payload.title,
            descr: action.payload.descr,
            date: today,
         };
         return {
            ...state,
            unapprovedNews: [...state.unapprovedNews, newNews],
         };
      }

      case "SET_IMG_URL":
         return {
            ...state,
            imgUrl: action.payload,
         };
      case "SET_TITLE":
         return {
            ...state,
            title: action.payload,
         };
      case "SET_DESCR":
         return {
            ...state,
            descr: action.payload,
         };

      case "SET_SEARCH_VALUE":
         return {
            ...state,
            searchValue: action.payload,
         };
      default:
         return state;
   }
};

export const clearInputs = () => {
   return {
      type: "CLEAR_INPUTS",
   };
};

export const createNewNews = (newNewsId) => {
   return {
      type: "CREATE_NEW_NEWS",
      payload: newNewsId,
   };
};
export const deleteNewNews = (newNewsId) => {
   return {
      type: "DELETE_NEW_NEWS",
      payload: newNewsId,
   };
};
export const createNewUnapprovedNews = (img, title, descr) => {
   return {
      type: "CREATE_NEW_UNAPPROVED_NEWS",
      payload: { img, title, descr },
   };
};
export const setNewImgUrl = (newImg) => {
   return {
      type: "SET_IMG_URL",
      payload: newImg,
   };
};
export const setNewTitle = (newTitle) => {
   return {
      type: "SET_TITLE",
      payload: newTitle,
   };
};
export const setNewDescr = (newDescr) => {
   return {
      type: "SET_DESCR",
      payload: newDescr,
   };
};

export const setSearchValue = (newValue) => {
   return {
      type: "SET_SEARCH_VALUE",
      payload: newValue,
   };
};
export default news;
