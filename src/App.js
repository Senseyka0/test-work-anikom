import { Route } from "react-router-dom";

import Header from "./components/Header/Header";

import MainPage from "./page/MainPage/MainPage";
import News from "./page/News/News";

import "./App.scss";

function App() {
   return (
      <div className="App">
         <div className="container">
            <Header />
            <div className="content">
               <Route path="/" exact component={MainPage} />
               <Route path="/news" component={News} />
            </div>
         </div>
      </div>
   );
}

export default App;
