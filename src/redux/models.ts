
export interface  postsTypes {
    id: number | any,
    title: string,
    body: string,
}

export interface deletePostTypes {
    deleteLoader:boolean,
    deleteStatus:string,
}
export interface  editPostTypes {
    editStatus: string,
    editLoader: boolean,
}

export interface newCommentTypes{
    name: string,
    email:string,
    body:string,
}

export interface commentPostTypes{
    commentLoader: boolean,
    addCommentStatus: string,
}
export interface stateTypes {
    posts: Array<postsTypes>
    status: string,
    addLoader: boolean,
}

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_PENDING = 'GET_POSTS_PENDING';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_PENDING = 'ADD_POST_PENDING';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_PENDING = 'DELETE_POST_PENDING';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';


export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_PENDING = 'EDIT_POST_PENDING';
export const EDIT_POST_ERROR = 'EDIT_POST_ERROR';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_PENDING = 'ADD_COMMENT_PENDING';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';