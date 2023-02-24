import type { PayloadAction } from '@reduxjs/toolkit'
import type { stateTypes } from '../models'

import {
  GET_POSTS_ERROR,
  GET_POSTS_PENDING,
  GET_POSTS_SUCCESS,
  ADD_POST_ERROR,
  ADD_POST_PENDING,
  ADD_POST_SUCCESS,
} from '../models'

export const initialState: stateTypes = {
  posts: [],
  status: '',
  addLoader: false,
}

export const postsReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        status: 'Success',
      }
    case GET_POSTS_PENDING:
      return {
        ...state,
      }
    case GET_POSTS_ERROR:
      return {
        ...state,
        status: 'Failed',
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        status: 'Successfully Edited',
        addLoader: false,
      }
    case ADD_POST_PENDING:
      return {
        ...state,
        addLoader: true,
      }
    case ADD_POST_ERROR:
      return {
        ...state,
        status: 'Failed to edit',
        addLoader: false,
      }
    default:
      return state
  }
}
