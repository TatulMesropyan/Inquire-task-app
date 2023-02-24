import type {PayloadAction} from "@reduxjs/toolkit";
import type {commentPostTypes} from '../models'

import {
    ADD_COMMENT_ERROR,
    ADD_COMMENT_PENDING,
    ADD_COMMENT_SUCCESS,
} from "../models";

export const initialState : commentPostTypes = {
    commentLoader: false,
    addCommentStatus: '',
}
export const commentPostReducer = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case  ADD_COMMENT_SUCCESS :
            return{
                ...state,
                commentLoader: false,
                status:'Success'
            }
        case  ADD_COMMENT_PENDING :
            return{
                ...state,
                commentLoader: true
            }
        case  ADD_COMMENT_ERROR :
            return{
                ...state,
                status:'Failed to add comment',
                commentLoader: false,
            }
        default:
            return state
    }
};