import {ADD_NEW_POST_ERROR, ADD_NEW_POST_PENDING,ADD_NEW_POST_SUCCESS,postsTypes} from "../models";

export const addPostError = (errorMessage: string) => ({
    type: ADD_NEW_POST_ERROR,
    payload: errorMessage,
});

export const addPostPending = () => ({
    type: ADD_NEW_POST_PENDING,
});

export const addPostSuccess = (posts: Array<postsTypes>) => ({
    type: ADD_NEW_POST_SUCCESS,
});