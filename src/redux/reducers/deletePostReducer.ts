import type { PayloadAction } from '@reduxjs/toolkit'

import {
  DELETE_POST_ERROR,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  deletePostTypes,
} from '../models'

export const initialState: deletePostTypes = {
  deleteLoader: false,
  deleteStatus: '',
}
export const deletePostReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        status: 'Successfully Deleted',
        deleteLoader: false,
      }
    case DELETE_POST_PENDING:
      return {
        ...state,
        deleteLoader: true,
      }
    case DELETE_POST_ERROR:
      return {
        ...state,
        status: 'Failed to Delete',
        deleteLoader: false,
      }
    default:
      return state
  }
}
