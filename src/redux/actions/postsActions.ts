import {GET_POSTS_ERROR, GET_POSTS_PENDING, GET_POSTS_SUCCESS,HANDLE_FIELD_CHANGE, postsTypes} from "../models";

export const getPostsError = (errorMessage: string) => ({
    type: GET_POSTS_ERROR,
    payload: errorMessage,
});

export const getPostsPending = () => ({
    type: GET_POSTS_PENDING,
});

export const getPostsSuccess = (posts: Array<postsTypes>) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
});


export const handleFieldsChange = (field:string,value:string) => ({
    type: HANDLE_FIELD_CHANGE,
    payload:value,
    field:field,
});
