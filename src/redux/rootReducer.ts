import { combineReducers } from '@reduxjs/toolkit'
import { postsReducer as postsState } from './reducers/postsReducer'
import { editPostsReducer as editPostState } from './reducers/editPostReducer'
import { deletePostReducer as deletePostState } from './reducers/deletePostReducer'
import { commentPostReducer as commentPostState } from './reducers/commentPostReducer'

const rootReducer = combineReducers({
    postsState,
    editPostState,
    deletePostState,
    commentPostState,
})
export default rootReducer
