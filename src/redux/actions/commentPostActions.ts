import {
  ADD_COMMENT_ERROR,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_SUCCESS,
  commentResponseTypes,
  OPEN_COMMENT_ERROR,
  OPEN_COMMENTS_PENDING,
  OPEN_COMMENTS_SUCCESS,
} from '../models'

export const addCommentSuccess = () => ({
  type: ADD_COMMENT_SUCCESS,
})

export const addCommentPending = () => ({
  type: ADD_COMMENT_PENDING,
})

export const addCommentError = () => ({
  type: ADD_COMMENT_ERROR,
})

export const openCommentsError = () => ({
  type: OPEN_COMMENT_ERROR,
})

export const openCommentsPending = () => ({
  type: OPEN_COMMENTS_PENDING,
})

export const openCommentsSuccess = (data: commentResponseTypes) => {
  const { body, title, comments, id } = data
  return {
    type: OPEN_COMMENTS_SUCCESS,
    payload: { body, title, comments, id },
  }
}
