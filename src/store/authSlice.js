import {createSlice } from "@reduxjs/toolkit";

const arr = [
{
    username : "darkknight",
    email : "darkknight@gmail.com",
    password : "darkknight"
},
{
    username : "abc",
    email : "abc@gmail.com",
    password : "abcd"
}]

const authSlice = createSlice({
    name : "auth",
    initialState : {
        loginStatus : false,
        dashStatus : false,
        likeStatus : false,
        loginData : arr,
        notification : "Going good",
        notificationStatus : "none",
        newsNotification : "Going good",
        newsNotificationStatus : "none"
    },
    reducers : {
        changeLoginStatus(state,action){
            return {
                ...state,
                loginStatus : action.payload
            }
        },
        changeDashStatus(state,action){
            return {
                ...state,
                dashStatus : action.payload
            }
        },
        changeLikesStatus(state,action)
        {
            return {
                ...state,
                likeStatus : action.payload
            }
        },
        updateLoginData(state,action)
        {
            return {
                ...state,
                loginData : [...state.loginData, action.payload]
            }
        },
        changeNotification(state,action)
        {
            return {
                ...state,
                notification : action.payload
            }
        },
        changeNotificationStatus(state,action)
        {
            return {
                ...state,
                notificationStatus : action.payload
            }
        },
        changeNewsNotification(state,action)
        {
            return {
                ...state,
                newsNotification : action.payload
            }
        },
        changeNewsNotificationStatus(state,action)
        {
            return {
                ...state,
                newsNotificationStatus : action.payload
            }
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;