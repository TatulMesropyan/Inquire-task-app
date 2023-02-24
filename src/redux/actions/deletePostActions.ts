import {
    DELETE_POST_ERROR,
    DELETE_POST_PENDING,
    DELETE_POST_SUCCESS,
} from '../models'

export const deletePostError = () => ({
    type: DELETE_POST_ERROR,
})

export const deletePostPending = () => ({
    type: DELETE_POST_PENDING,
})

export const deletePostSuccess = () => ({
    type: DELETE_POST_SUCCESS,
})
