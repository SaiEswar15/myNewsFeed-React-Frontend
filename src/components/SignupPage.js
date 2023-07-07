import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { Link } from 'react-router-dom';
import "./SignupPage.css";

function SignupPage() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const arr = useSelector((state)=>state.auth.loginData)
    const notification = useSelector((state)=>state.auth.notification)
    const notificationStatus = useSelector((state)=>state.auth.notificationStatus)

    function submitHandler(e)
    {
        e.preventDefault();
        
        let obj = 
        {
            "username" : e.target["username"].value,
            "email" : e.target["email"].value,
            "password" : e.target["password"].value,
            "confirm-password" : e.target["confirm-password"].value
        }
        console.log(obj);

        let status = false;

        if(obj.password !== obj['confirm-password'])
        {
            dispatch(authActions.changeNotificationStatus("block"))
            dispatch(authActions.changeNotification("passwords not matched"))
            setTimeout(()=>{
                dispatch(authActions.changeNotificationStatus("none"))
            },3000)
            status = true;
        }
        else
        {
            status = arr.find((el)=>{
                if(el.email === obj.email)
                {
                    dispatch(authActions.changeNotificationStatus("block"))
                    dispatch(authActions.changeNotification("user already exists"))
                    setTimeout(()=>{
                        dispatch(authActions.changeNotificationStatus("none"))
                    },3000)
                    return true;
                }
                return false;
            })
        }

        if(!status)
        {
            dispatch(authActions.updateLoginData(obj))

            console.log(arr)

            Navigate("/login")
        }  
    }

    let styleObj = {
        display : notificationStatus
    }
    

    useEffect(()=>{

        dispatch(authActions.changeDashStatus(false))
        

    },[dispatch, notification, notificationStatus,arr])


  return (
    <div className='signup-container'>
        
        <form onSubmit = {submitHandler}>
            <h1>Sign up</h1>
            <input type = "text" placeholder= 'username' name = "username"/>
            <input type = "email" placeholder='email' name = "email"/>
            <input type = "password" placeholder='password' name = "password"/>
            <input type = "password" placeholder='confirm password' name = "confirm-password"/>
            <button>Signup</button>
            <p>Already member ? <Link to ="/login">Login</Link> || <Link to ="/">Home</Link></p>
        </form>

        <p className = "notification" style = {styleObj}>{notification}</p>
    </div>
  )
}

export default SignupPage