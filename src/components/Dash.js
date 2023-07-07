import React from 'react';
import "./Dash.css";
import { useEffect } from 'react';
import banner from "../images/banner.jpg"
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { Link } from 'react-router-dom';

function Dash() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(authActions.changeDashStatus(false));
        dispatch(authActions.changeLikesStatus(false));
    },[dispatch])

    // dispatch(authActions.changeDashStatus(false));
    // dispatch(authActions.changeLikesStatus(false));
  return (
    <div className = "info">
        <div className = "text">
            <div className = "alltext">
                <p className = "t1">No more difficulty finding the news of your interest.</p>
                <p className = "t2">Filter your news of your choice and enjoy endless articles.</p>
                <p className = "t3">save your articles and watch them later.</p>
                <div className = "bs">
                    <Link to = "/likes"> 
                    <button className = "b1">Saved News</button>
                    </Link>
                    <Link to = "/news">
                        <button className = "b2">Load New News</button>
                    </Link>
                    
                </div>
                
            </div>
        </div>
        <div className = "banner">
            <img src = {banner} alt = "banner"/>
        </div>
    </div>
  )
}

export default Dash