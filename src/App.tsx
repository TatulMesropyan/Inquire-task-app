import type {stateTypes} from "./redux/models";

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";

import SinglePost from "./components/SinglePost/SinglePost";
import NewPostDialog from "./components/NewPostDialog/NewPostDialog";
import {getPostsError, getPostsPending, getPostsSuccess } from "./redux/actions/postsActions";
import './App.css';

function App() {
    const dispatch = useDispatch()
    // @ts-ignore
    //TODO Fix state type issue
    const data: stateTypes = useSelector(state => state.postsState)
    const {loader, posts, errorMessage} = data || {};
    const [newPostLoading,setNewPostLoading] = useState<boolean>(false);
    const [newPostDialog,setNewPostDialog] = useState<boolean>(false);
    const [newPost,setNewPost] = useState<{title: string; body: string}>({
        title: "",
        body: "",
    })

    useEffect(() => {
        const getPosts = async () => {
            dispatch(getPostsPending());
            await axios.get(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
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
        axios.post(`https://blog-api-t6u0.onrender.com/posts`,newPost).then((res) =>{
                setNewPostLoading(false)
                 setNewPostDialog(false)
            }
        ).catch(err =>{
            setNewPostLoading(false)
            setNewPostDialog(false)
        })
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        return setNewPost({...newPost, [field]: e.target.value})
    }

  return (
    <div className="App">
        <Button variant="contained" color='inherit' sx={{zIndex:'2',position:'sticky',top:'50vh',left:'13vh'}} onClick={() => setNewPostDialog(true)}>
            <Add/>
        </Button>
        {newPostDialog &&
			<NewPostDialog
                isLoading={newPostLoading}
                onTitleChange={(e) => handleFieldChange(e,'title')}
                onDescriptionChange={e => handleFieldChange(e, 'body')}
                onClose={() => setNewPostDialog(false)}
                onSubmit={addPost}/>
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
