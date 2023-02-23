import { PayloadAction } from '@reduxjs/toolkit'
import {
    GET_POSTS_ERROR,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    stateTypes,
} from "../models";

export const initialState : stateTypes = {
    posts: [],
    status: '',
};

export const postsReducer = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case  GET_POSTS_SUCCESS :
            return{
                ...state,
                posts: action.payload,
                status:'Success'
            }
        case  GET_POSTS_PENDING :
            return{
                ...state,
            }
        case  GET_POSTS_ERROR :
            return{
                ...state,
                status:'Failed'
            }
        default:
            return state
    }
};