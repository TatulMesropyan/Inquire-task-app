import {PayloadAction} from "@reduxjs/toolkit";
import type {commentPostTypes} from '../models'
import {
    ADD_COMMENT_ERROR,
    ADD_COMMENT_PENDING,
    ADD_COMMENT_SUCCESS, HANDLE_FIELD_CHANGE,
} from "../models";

export const initialState : commentPostTypes = {
    commentLoader: false,
    addCommentStatus: '',
    newComment: {
        id: null,
        name: '',
        email:'',
        body:'',
    },
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
        case HANDLE_FIELD_CHANGE :
            return {
                ...state,
                newComment:{...state.newComment}
            }
        default:
            return state
    }
};