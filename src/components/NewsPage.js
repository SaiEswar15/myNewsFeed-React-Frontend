import "./NewsPage.css";
import React from 'react';
import like from "../images/like.png"
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiActions } from '../store/apiSlice';
import { authActions } from '../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';


function NewsPage() {

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const apiData = useSelector((state)=>state.api.apiData);
  const likedData = useSelector((state)=>state.api.likedData);
  const loginStatus = useSelector((state)=>state.auth.loginStatus);
  const newsNotification = useSelector((state)=>state.auth.newsNotification)
  const newsNotificationStatus = useSelector((state)=>state.auth.newsNotificationStatus)

  let [color] = useState("rgb(255, 255, 255)");

  useEffect(()=>{

    if(!loginStatus)
    {
      Navigate("/login")
    }

    dispatch(authActions.changeDashStatus(true));
    dispatch(authActions.changeLikesStatus(false));

    fetch("https://mynewsfeed-react-backend.onrender.com/news")
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      console.log(res)
      dispatch(apiActions.updateApiData(res));
      dispatch(apiActions.storeApiData(res));
      
    })
  },[Navigate,dispatch,loginStatus,newsNotification,newsNotificationStatus])


  function handler(e)
  {
    //functionality to switch between categories with color
    let i = document.querySelectorAll(".btn");
    i.forEach((el)=>{
      console.log(el);
      return el.style.backgroundColor = "rgb(255, 255, 255)";
    })
    e.target.style.backgroundColor = "rgb(255, 0, 72)";

    //sort by category 
    console.log("handler",e.target.id);
    dispatch(apiActions.filter(e.target.id));
  }

  function likeHandler(el)
  {

    let status = likedData.find((ele)=>{
      return ele._id === el._id
    })

    if(!status)
    {
      //functionality that popups the notification 
      dispatch(authActions.changeNewsNotificationStatus("block"))
      dispatch(authActions.changeNewsNotification("Article saved"))
      setTimeout(()=>{
          dispatch(authActions.changeNewsNotificationStatus("none"))
      },3000)

      //updates the elements into the like page
      dispatch(apiActions.updateLikes(el))
      dispatch(apiActions.storeLikes(el))
    }
    else
    {

      ////functionality that popups the notification 
      dispatch(authActions.changeNewsNotificationStatus("block"))
      dispatch(authActions.changeNewsNotification("Article already exists"))
      setTimeout(()=>{
          dispatch(authActions.changeNewsNotificationStatus("none"))
      },3000)
    }
    
    
  }

  //style object for categories background color
  let styleObj = { 
    backgroundColor : color
  }

  //style object for notification display
  let styleObj2 = {
    display : newsNotificationStatus
  }

  return (<div className='newspage-whole'>

    {/* first column of the container which is categories display buttons */}
    <div className = "nav2">
        <button className = "btn" id = "all" style = {styleObj} onClick = {handler}>ALL</button>
        <button className = "btn" id = "sports" style = {styleObj} onClick = {handler} >SPORTS</button>
        <button className = "btn" id = "science" style = {styleObj} onClick = {handler}>SCIENCE</button>
        <button className = "btn" id = "automobile" style = {styleObj} onClick = {handler}>AUTOMOBILE</button>
        <button className = "btn" id = "world" style = {styleObj} onClick = {handler}>WORLD</button>
        <button className = "btn" id = "politics" style = {styleObj} onClick = {handler}>POLITICS</button>
        <button className = "btn" id = "health" style = {styleObj} onClick = {handler}>HEALTH</button>
    </div>

    {/* second column of the container contains the news articles container */}
    {apiData && apiData.map((el)=>{
    return (
    <div className = "newscontainer" id = "container" key = {el._id}>
      
      <div className = "newscon all">
          <div className = "img">
            <img src = {el.imageUrl} alt = "news-article-look"/>
          </div>
          <div className = "main">
              <h1 className = "headline">{el.title}</h1>
              <div className = "article">
                  <p className = "news">{el.content}</p>
              </div>
              
              <a href= {el.readmoreUrl} className = "readmore">Read more</a>    
              <p className="publisher">PUBLISHED BY :  {el.author.toUpperCase()}</p>
              <p className = "category" >CATEGORY :  {el.category.toUpperCase()}</p>
                      
              <span className="material-symbols-outlined">
                <img src={like} alt = "like" onClick = {()=>{likeHandler(el)}}></img>
              </span>
          </div> 
      </div>
        
    </div>)
    })}

    {/* third column of the container which is notification popup  */}
    <p className = "notification-newspage" style = {styleObj2}>{newsNotification}</p>

  </div>)
  }

export default NewsPage