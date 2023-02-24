import {
    EDIT_POST_ERROR,
    EDIT_POST_SUCCESS,
    GET_POSTS_PENDING,
} from '../models'

export const editPostError = () => ({
    type: EDIT_POST_ERROR,
})

export const editPostPending = () => ({
    type: GET_POSTS_PENDING,
})

export const editPostSuccess = () => ({
    type: EDIT_POST_SUCCESS,
})
