import type {PayloadAction} from "@reduxjs/toolkit";
import type {editPostTypes} from "../models"

import {
    EDIT_POST_ERROR,
    EDIT_POST_PENDING,
    EDIT_POST_SUCCESS,
    HANDLE_FIELD_CHANGE,
} from "../models";

export const initialState : editPostTypes = {
    editStatus: '',
    editLoader: false,
    updatedPost: {
        id :null,
        title: '',
        body: ''
    },
};

export const editPostsReducer = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case EDIT_POST_SUCCESS :
            return {
                ...state,
                status: 'Successfully Edited',
                editLoader: false,
            }
        case  EDIT_POST_PENDING :
            return {
                ...state,
                editLoader: true,
            }
        case  EDIT_POST_ERROR :
            return {
                ...state,
                status: 'Failed to edit',
                editLoader: false
            }
        case HANDLE_FIELD_CHANGE :
            //@ts-ignore
            let field = action.field;
            let value = action.payload;
            return {
                ...state,
                updatedPost: {...state.updatedPost, [field]: value}
            }
        default:
            return state
    }
}