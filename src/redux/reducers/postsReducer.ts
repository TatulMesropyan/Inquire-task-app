import { PayloadAction } from '@reduxjs/toolkit'
import {GET_POSTS_ERROR, GET_POSTS_PENDING, GET_POSTS_SUCCESS, stateTypes} from "../models";

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
                errorMessage: false,
            }
        default:
            return state
    }
};