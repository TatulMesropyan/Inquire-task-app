
export interface  postsTypes {
    id: number,
    title: string,
    body: string,
}

export interface singlePostTypes{
    title: string,
    body: string,
}

export interface stateTypes {
    errorMessage: string,
    posts: Array<postsTypes>
    loader: boolean,
    newPost: singlePostTypes,
    updatedPost: singlePostTypes,
}

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_PENDING = 'GET_POSTS_PENDING';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
