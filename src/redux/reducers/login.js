import { fire } from "../../assets/fire";

const initialState = {
   isOpenPopup: false,
   user: "",
   email: "",
   password: "",
   emailError: "",
   passwordError: "",
   hasAccount: false,
};

const login = (state = initialState, action) => {
   switch (action.type) {
      case "SET_VISIBILITY_POPUP":
         return {
            ...state,
            isOpenPopup: action.payload,
         };
      case "SET_CLEAR_INPUTS":
         return {
            ...state,
            email: "",
            password: "",
         };
      case "SET_CLEAR_ERRORS":
         return {
            ...state,
            emailError: "",
            passwordError: "",
         };

      case "SET_EMAIL":
         return {
            ...state,
            email: action.payload,
         };
      case "SET_PASSWORD":
         return {
            ...state,
            password: action.payload,
         };

      case "SET_USER":
         return {
            ...state,
            user: action.payload,
         };

      case "SET_EMAIL_ERROR":
         return {
            ...state,
            emailError: action.payload,
         };
      case "SET_PASSWORD_ERROR":
         return {
            ...state,
            passwordError: action.payload,
         };

      case "SET_HAS_ACCOUNT":
         return {
            ...state,
            hasAccount: action.payload,
         };

      default:
         return state;
   }
};

export const setVisibilityPopup = (bool) => {
   return {
      type: "SET_VISIBILITY_POPUP",
      payload: bool,
   };
};

export const setClearInputs = () => {
   return {
      type: "SET_CLEAR_INPUTS",
   };
};
export const setClearErrors = () => {
   return {
      type: "SET_CLEAR_ERRORS",
   };
};

export const setUser = (user) => {
   return {
      type: "SET_USER",
      payload: user,
   };
};
export const setEmail = (email) => {
   return {
      type: "SET_EMAIL",
      payload: email,
   };
};
export const setPassword = (password) => {
   return {
      type: "SET_PASSWORD",
      payload: password,
   };
};

export const setEmailError = (message) => {
   return {
      type: "SET_EMAIL_ERROR",
      payload: message,
   };
};
export const setPasswordError = (message) => {
   return {
      type: "SET_PASSWORD_ERROR",
      payload: message,
   };
};
export const setHasAccount = (bool) => {
   return {
      type: "SET_HAS_ACCOUNT",
      payload: bool,
   };
};

export const fetchLogin = (email, password) => (dispatch) => {
   dispatch(setClearErrors());

   fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
         switch (error.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
               dispatch(setEmailError(error.message));
               break;
            case "auth/wrong-password":
               dispatch(setPasswordError(error.message));
               break;
            default:
               break;
         }
      });
};
export const fetchSignUp = (email, password) => (dispatch) => {
   dispatch(setClearErrors());

   fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
         switch (error.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
               dispatch(setEmailError(error.message));
               break;
            case "auth/weak-password":
               dispatch(setPasswordError(error.message));
               break;
            default:
               break;
         }
      });
};
export const setLogout = () => {
   fire.auth().signOut();
};
export const fetchAuthListener = () => (dispatch) => {
   fire.auth().onAuthStateChanged((user) => {
      if (user) {
         user
            .updateProfile({
               displayName:
                  (user.email === "admin@gmail.com" && "Михаил") ||
                  (user.email === "user@gmail.com" && "Дарья"),
            })
            .then(() => {
               dispatch(setClearInputs());
               dispatch(setVisibilityPopup(false));
               dispatch(setUser(user));
            });
      } else {
         dispatch(setVisibilityPopup(true));
         dispatch(setUser(""));
      }
   });
};

export default login;
