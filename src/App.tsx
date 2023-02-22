import type {stateTypes} from "./redux/models";
import type {ChangeEvent} from 'react'

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingButton} from '@mui/lab';
import axios from 'axios';
import {getPostsSuccess, getPostsPending, getPostsError} from "./redux/actions/postsActions";
import SinglePost from "./components/SinglePost/SinglePost";
import './App.css';
import {Button, Dialog} from "@mui/material";
import {Add} from "@mui/icons-material";
import NewPostDialog from "./components/NewPostDialog/NewPostDialog";
import newPostDialog from "./components/NewPostDialog/NewPostDialog";

function App() {
    const dispatch = useDispatch()
    // @ts-ignore
    //TODO Fix state type issue
    const data:stateTypes = useSelector(state => state.postsState)
    const {loader, posts, errorMessage} = data || {};
    const [newPostLoading,setNewPostLoading] = useState(false);
    const [newPost,setNewPost] = useState<{title: string; body: string}>({
        title: "",
        body: "",
    })

    useEffect(() => {
        const getPosts = () => {
            dispatch(getPostsPending());
            axios.get(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
                let posts = res.data;
                dispatch(getPostsSuccess(posts))
                }
            ).catch(err => dispatch(getPostsError(err.message)))
        }
            getPosts();
        }
    ,[dispatch])

    const addPost = () => {
        setNewPostLoading(true);
        axios.post(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
                let posts = res.data;
                dispatch(getPostsSuccess(posts))
            }
        ).catch(err => dispatch(getPostsError(err.message)))
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setNewPost({...newPost, [field]: e.target.value})
    }
  return (
    <div className="App">
        <Button variant="contained"  sx={{zIndex:'2',position:'sticky',top:'50vh'}} onClick={() => setNewPostLoading(prevState => !prevState)}>
            <Add/>
        </Button>
        {newPostLoading &&
			<NewPostDialog onTitleChange={(e) => handleFieldChange(e,'title')} onDescriptionChange={e => handleFieldChange(e, 'body')}/>
        }
    {posts?.map(({title,body,id}) => (
      <SinglePost
          key={id}
          title={title}
          description={body}
          postID={id}
      />
      ))}
    </div>
  );
}

export default App;
