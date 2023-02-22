import {ActionMatchingAnyOf, configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

const store : ToolkitStore<ActionMatchingAnyOf<any>> = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware:any) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;
