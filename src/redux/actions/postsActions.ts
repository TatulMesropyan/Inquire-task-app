import type {postsTypes} from '../models';

import {
    ADD_POST_ERROR,
    ADD_POST_PENDING,
    ADD_POST_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS
} from "../models";

export const getPostsError = () => ({
    type: GET_POSTS_ERROR,
});

export const getPostsPending = () => ({
    type: GET_POSTS_PENDING,
});

export const getPostsSuccess = (posts: Array<postsTypes>) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
});

export const addPostSuccess = () => ({
    type: ADD_POST_SUCCESS,
});

export const addPostPending = () => ({
    type: ADD_POST_PENDING,
});

export const addPostError = () => ({
    type: ADD_POST_ERROR,
});
