import {ADD_COMMENT_ERROR, ADD_COMMENT_PENDING, ADD_COMMENT_SUCCESS} from "../models";

export const addCommentSuccess = () => ({
    type: ADD_COMMENT_SUCCESS,
});

export const addCommentPending = () => ({
    type: ADD_COMMENT_PENDING,
});

export const addCommentError = () => ({
    type: ADD_COMMENT_ERROR,
});
