import type { PayloadAction } from '@reduxjs/toolkit'
import type { editPostTypes } from '../models'

import {
    EDIT_POST_ERROR,
    EDIT_POST_PENDING,
    EDIT_POST_SUCCESS,
} from '../models'

export const initialState: editPostTypes = {
    editStatus: '',
    editLoader: false,
}

export const editPostsReducer = (
    state = initialState,
    action: PayloadAction
) => {
    switch (action.type) {
        case EDIT_POST_SUCCESS:
            return {
                ...state,
                editStatus: 'Successfully Edited',
                editLoader: false,
            }
        case EDIT_POST_PENDING:
            return {
                ...state,
                editLoader: true,
            }
        case EDIT_POST_ERROR:
            return {
                ...state,
                editStatus: 'Failed to edit',
                editLoader: false,
            }
        default:
            return state
    }
}
