import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//TODO fix store types

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware:any) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
