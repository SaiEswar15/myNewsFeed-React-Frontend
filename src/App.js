import './App.css';
import Dash from "./components/Dash";
import Navbar from "./components/Navbar";
import NewsPage from "./components/NewsPage";
import LikedPage from "./components/LikedPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import {BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path = "/" exact element = {<Dash/>}></Route>
        <Route path = "/news" exact element = {<NewsPage/>}></Route>
        <Route path = "/likes" exact element = {<LikedPage/>}></Route>
        <Route path = "/login" exact element = {<LoginPage/>}></Route>
        <Route path = "/signup" exact element = {<SignupPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
