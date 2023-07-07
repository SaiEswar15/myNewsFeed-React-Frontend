import "./Navbar.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { authActions } from "../store/authSlice";
import { useSelector, useDispatch } from 'react-redux';


function Navbar() {

    const dispatch = useDispatch();

    const loginStatus = useSelector((state) => state.auth.loginStatus);
    const dashStatus = useSelector((state) => state.auth.dashStatus);
    const likeStatus = useSelector((state) => state.auth.likeStatus);

    function logoutHandler()
    {
        dispatch(authActions.changeLoginStatus(false))
    }

    return (
        <div className="navbar">

            {/* logo of the page  */}
            <Link to="/" className='link'>
                <div className="logo">
                    <h1>my<span className="span">N</span>ews<span className="span">F</span>eed</h1>
                </div>
            </Link>

            <div className="nav-buttons">

                {/* shows login or logout buttons according to the login status */}
                {loginStatus ?
                    <button className="logout" onClick = {logoutHandler}>Logout</button> :
                    <>
                        <Link to="/signup">
                            <button className="si">Sign up</button>
                        </Link>
                        <Link to="/login">
                            <button className="li">Log in</button>
                        </Link>
                    </>
                }

                {/* when you are in the newspage it should show saved articles in the navbar */}
                {dashStatus ?
                    <Link to="/likes">
                        <button className="saved-artcles">Saved Articles</button>
                    </Link> : 
                    null
                }

                {/* when you are in the likedpage it should show the load newspage in the navbar */}
                {likeStatus ?
                    <Link to="/news">
                        <button className="load-news">Load News</button>
                    </Link> : 
                    null
                }

            </div>

            
        </div>
    )
}

export default Navbar