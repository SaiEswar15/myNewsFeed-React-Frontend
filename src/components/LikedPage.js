import React, { useState, useEffect } from 'react'
import like from "../images/like.png"
import "./LikedPage.css";
import { useSelector,useDispatch } from 'react-redux';
import { apiActions } from '../store/apiSlice';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LikedPage() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const likedData = useSelector((state)=>state.api.likedData);
    const loginStatus = useSelector((state)=>state.auth.loginStatus);
    const newsNotification = useSelector((state)=>state.auth.newsNotification)
    const newsNotificationStatus = useSelector((state)=>state.auth.newsNotificationStatus)

    let [color] = useState("rgb(255, 255, 255)");

    let styleObj = {
        backgroundColor : color
    }

    let styleObj2 = {
        display : newsNotificationStatus,
        backgroundColor : "red",
        border : "1px solid orangered"
      }

    function handler(e)
    {
        let i = document.querySelectorAll(".btn");
        i.forEach((el)=>{
        console.log(el);
        return el.style.backgroundColor = "rgb(255, 255, 255)";
        })
        e.target.style.backgroundColor = "rgb(255, 0, 72)";
        console.log("handler",e.target.id);
        dispatch(apiActions.likeFilter(e.target.id));
    }

    function likeHandler(el)
    {
        console.log(el);
        dispatch(apiActions.removeLike(el))
        dispatch(authActions.changeNewsNotificationStatus("block"))
        dispatch(authActions.changeNewsNotification("Article Removed"))
        setTimeout(()=>{
            dispatch(authActions.changeNewsNotificationStatus("none"))
        },3000)
    }

    useEffect(()=>{

        if(!loginStatus)
        {
        Navigate("/login")
        }

        dispatch(authActions.changeDashStatus(false));
        dispatch(authActions.changeLikesStatus(true));

    },[dispatch,Navigate,loginStatus])

  return (
    <div className='newspage-whole'>

        <div className='saved-articles'>
            <p>Saved Articles</p>
        </div>

        <div className = "nav2">
        <button className = "btn" id = "all" style = {styleObj} onClick = {handler}>ALL</button>
        <button className = "btn" id = "sports" style = {styleObj} onClick = {handler} >SPORTS</button>
        <button className = "btn" id = "science" style = {styleObj} onClick = {handler}>SCIENCE</button>
        <button className = "btn" id = "automobile" style = {styleObj} onClick = {handler}>AUTOMOBILE</button>
        <button className = "btn" id = "world" style = {styleObj} onClick = {handler}>WORLD</button>
        <button className = "btn" id = "politics" style = {styleObj} onClick = {handler}>POLITICS</button>
        <button className = "btn" id = "health" style = {styleObj} onClick = {handler}>HEALTH</button>
    </div>

    {likedData && likedData.map((el)=>{
    return (
    <div className = "newscontainer" id = "container" key = {el._id}>
        
        <div className = "newscon all">
            <div className = "img">
            <img src = {el.imageUrl} alt = "saved-news-article-look"/>
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
                <img src={like} alt = "like-look" onClick = {()=>{likeHandler(el)}}></img>
                </span>
            </div> 
        </div>
        
    </div>)
    })}

    <p className = "notification-newspage" style = {styleObj2}>{newsNotification}</p>
    </div>
  )
}

export default LikedPage