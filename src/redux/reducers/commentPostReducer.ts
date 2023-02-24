import type {PayloadAction} from "@reduxjs/toolkit";
import type {commentPostTypes} from '../models'

import {
    ADD_COMMENT_ERROR,
    ADD_COMMENT_PENDING,
    ADD_COMMENT_SUCCESS,
    OPEN_COMMENTS_SUCCESS,
    OPEN_COMMENTS_PENDING,
    OPEN_COMMENT_ERROR,
} from "../models";

export const initialState : commentPostTypes = {
    commentLoader: false,
    addCommentStatus: '',
    openCommentLoader: false,
    body:'',
    title:'',
    comments:[],
    id: null,
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
        case  OPEN_COMMENTS_SUCCESS :
            //@ts-expect-error
            const {body,comments,title,id} = action.payload;
            return{
                ...state,
                openCommentLoader: false,
                status:'Success',
                body:body,
                title:title,
                comments:comments,
                id:id,
            }
        case  OPEN_COMMENTS_PENDING :
            return{
                ...state,
                openCommentLoader: true
            }
        case  OPEN_COMMENT_ERROR :
            return{
                ...state,
                status:'Failed to add comment',
                openCommentLoader: false,
            }
        default:
            return state
    }
};