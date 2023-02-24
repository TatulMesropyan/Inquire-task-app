import type {deletePostTypes, editPostTypes, stateTypes} from "./redux/models";

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import { Routes, Route } from "react-router-dom";

import SinglePost from "./components/SinglePost";
import PostsDialogs from "./components/PostsDialogs";
import {getPostsError, getPostsPending, getPostsSuccess} from "./redux/actions/postsActions";
import './App.css';
import Comments from "./components/Comments";

function App() {
    const dispatch = useDispatch()
    //TODO Fix state type issue
    // @ts-ignore
    const editData: editPostTypes = useSelector(state => state.editPostState)
    const {editStatus,editLoader} = editData || {};
    // @ts-ignore
    const deleteData: deletePostTypes = useSelector(state => state.deletePostState)
    const {deleteStatus,deleteLoader} = deleteData || {};
    // @ts-ignore
    const postsData : stateTypes = useSelector(state => state.postsState)
    const {posts,addLoader} = postsData || {}
    const [option,setOption] = useState<{action:string,postID:any}>({
        action: '',
        postID: null
    })


    useEffect(() => {
            dispatch(getPostsPending());
            axios.get(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
                let posts = res.data;
                dispatch(getPostsSuccess(posts))
                }
            ).catch(err => dispatch(getPostsError()))
        }
    ,[dispatch, deleteLoader, editLoader, addLoader])


    return (
    <div className="App">
        <Routes>
            <Route
            path={'/'}
            element={
                <>
                    <PostsDialogs setOption={setOption} option={option}/>
                    {posts?.map((post) => (
                        !!post &&
						<SinglePost
							onChoose={setOption}
							postID={post.id}
							key={post.id}
							title={post.title}
							description={post.body}
						/>
                    ))}
                </>
            }
            />
            <Route
                path={'/comments'}
                element={<Comments postID={option.postID}/>}
                />
            </Routes>
    </div>
  );
}

export default App;
