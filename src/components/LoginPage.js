import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import { Link } from 'react-router-dom';


function LoginPage() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const arr = useSelector((state)=>state.auth.loginData)
    const notification = useSelector((state)=>state.auth.notification)
    const notificationStatus = useSelector((state)=>state.auth.notificationStatus)
    

    function submitHandler(e)
    {
        e.preventDefault();
        
        let obj = {
            "email" : e.target["email"].value,
            "password" : e.target["password"].value
        }
        console.log(obj);
      
        let status = arr.find((el)=>{
            console.log(el);
            if(el.email === obj.email && el.password === obj.password)
            {
                console.log("true");
                return true;
            }
            else if (el.email !== obj.email && el.password !== obj.password)
            {
                console.log(el.email, obj.email);
                console.log(el.password, obj.password);
                console.log("wrong credentials");
                dispatch(authActions.changeNotificationStatus("block"))
                dispatch(authActions.changeNotification("wrong credentials"))
                setTimeout(()=>{
                    dispatch(authActions.changeNotificationStatus("none"))
                },3000)
                return false;
            }
            else if(el.email === obj.email && el.password !== obj.password)
            {
                console.log(el.email, obj.email);
                console.log(el.password, obj.password);
                console.log("wrong password");
                dispatch(authActions.changeNotificationStatus("block"))
                dispatch(authActions.changeNotification("wrong password"))
                setTimeout(()=>{
                    dispatch(authActions.changeNotificationStatus("none"))
                },3000)
                return false;
            }
            return false;
        })

        if(status)
        {
            dispatch(authActions.changeLoginStatus(true))
            Navigate("/")
        }

    }

    let styleObj = {
        display : notificationStatus
    }

    useEffect(()=>{

        dispatch(authActions.changeDashStatus(false))
        

    },[dispatch, notification, notificationStatus])
  return (
    <div className='login-container'>
        
        <form onSubmit = {submitHandler}>
            <h1>Login</h1>
            <input type = "email" placeholder='email' name = "email"/>
            <input type = "password" placeholder='password' name = "password"/>
            <button>Login</button>
            <p>No account ? <Link to ="/signup">Sign up</Link> || <Link to ="/">Home</Link></p>
        </form>

        <p className = "notification" style = {styleObj}>{notification}</p>

    </div>
  )
}

export default LoginPage