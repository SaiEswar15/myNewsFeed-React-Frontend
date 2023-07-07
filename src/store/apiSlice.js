import {createSlice} from "@reduxjs/toolkit";

let apiSlice = createSlice({
    name : "api",
    initialState : {
        apiData : [],
        storeData : [],
        likedData : [],
        storeLikedData : []
    },
    reducers : {

        updateApiData(state,action)
        {
            return {
                ...state,
                apiData : action.payload
            }
        },
        storeApiData(state,action)
        {
            return {
                ...state,
                storeData : action.payload
            }
        },
        filter(state,action)
        {
            console.log("store", action.payload)
            if(action.payload === "all")
            {
                return {
                    ...state,
                    apiData : state.storeData
                }
            }
            return {
                ...state,
                apiData : state.storeData.filter((el)=>{
                    return el.category === action.payload
                })
            }
        },
        updateLikes(state,action)
        {
            return {
                ...state,
                likedData : [...state.likedData, action.payload]
            }
        },
        storeLikes(state,action)
        {
            return {
                ...state,
                storeLikedData : [...state.storeLikedData, action.payload]
            }
        },
        removeLike(state,action)
        {
            console.log("action",action.payload);
            let ele = action.payload;
            console.log(ele);
            console.log("liked data", JSON.parse(JSON.stringify(state.likedData)));
            let data = JSON.parse(JSON.stringify(state.likedData));
            return {
                ...state,
                likedData : data.filter((el)=>{
                    return ele._id !== el._id
                })
            }
        },
        likeFilter(state,action)
        {
            console.log("store", action.payload)
            if(action.payload === "all")
            {
                return {
                    ...state,
                    likedData : state.storeLikedData
                }
            }
            return {
                ...state,
                likedData : state.storeLikedData.filter((el)=>{
                    return el.category === action.payload
                })
            }
        }
    }
})

const apiActions = apiSlice.actions;

export default apiSlice;

export {apiActions};