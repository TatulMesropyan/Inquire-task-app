import { PayloadAction } from '@reduxjs/toolkit'
import {
    ADD_NEW_POST_ERROR,
    ADD_NEW_POST_PENDING,
    ADD_NEW_POST_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    stateTypes
} from "../models";

export const initialState : stateTypes = {
    errorMessage: '',
    posts: [],
    loader: false,
    newPost: {
        title: '',
        body: ''
    },
    updatedPost: {
        title: '',
        body: ''
    },
};

export const postsReducer = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case  GET_POSTS_SUCCESS :
            return{
                ...state,
                posts: action.payload,
                loader: false,
            }
        case  GET_POSTS_PENDING :
            return{
                ...state,
                loader: true,
            }
        case  GET_POSTS_ERROR :
            return{
                ...state,
                errorMessage: action.payload,
            }
        case ADD_NEW_POST_SUCCESS :
            return{
                ...state,
            }
        case  ADD_NEW_POST_PENDING :
            return{
                ...state,
                loader: true,
            }
        case  ADD_NEW_POST_ERROR :
            return{
                ...state,
                errorMessage: false,
            }
        default:
            return state
    }
};