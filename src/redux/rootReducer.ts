import { combineReducers } from '@reduxjs/toolkit';
import { postsReducer as postsState } from './reducers/postsReducer';

const rootReducer = combineReducers({
    postsState,
});
export default rootReducer;