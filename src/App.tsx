import type {deletePostTypes, editPostTypes, stateTypes} from "./redux/models";

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";

import SinglePost from "./components/SinglePost/SinglePost";
import NewPostDialog from "./components/NewPostDialog/NewPostDialog";
import {getPostsError, getPostsPending, getPostsSuccess, handleFieldsChange } from "./redux/actions/postsActions";
import './App.css';
import {deletePostError, deletePostPending, deletePostSuccess} from "./redux/actions/deletePostActions";

function App() {
    const dispatch = useDispatch()
    //TODO Fix state type issue
    // @ts-ignore
    const editData: editPostTypes = useSelector(state => state.editPostState)
    const {editStatus,editLoader,updatedPost} = editData || {};
    // @ts-ignore
    const deleteData: deletePostTypes = useSelector(state => state.deletePostState)
    const {deleteStatus,deleteLoader} = deleteData || {};
    // @ts-ignore
    const postsData : stateTypes = useSelector(state => state.postsState)
    const {posts,status} = postsData || {}
    const [newPostLoading,setNewPostLoading] = useState<boolean>(false);
    const [newPostDialog,setNewPostDialog] = useState<boolean>(false);
    const [newPost,setNewPost] = useState<{title: string; body: string}>({
        title: "",
        body: "",
    })

    useEffect(() => {
            dispatch(getPostsPending());
            axios.get(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
                let posts = res.data;
                dispatch(getPostsSuccess(posts))
                }
            ).catch(err => dispatch(getPostsError(err.message)))
        }
    ,[dispatch, deleteLoader,editLoader])

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

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => (
        dispatch(handleFieldsChange(field, e.target.value))
)

    const deletePost = async (postID:number) => {
        dispatch(deletePostPending());
        await axios.delete(`https://blog-api-t6u0.onrender.com/posts/${postID}`).then(() =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
    }

    const editPost = async (postID:number) => {
        dispatch(deletePostPending());
        await axios.put(`https://blog-api-t6u0.onrender.com/posts/${postID}`,).then(() =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
    }

     const commentPost = async (postID:number) => {
        dispatch(deletePostPending());
        await axios.put(`https://blog-api-t6u0.onrender.com/posts/${postID}`).then(() =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
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
           onEdit={() => editPost(id)}
           onComment={() => commentPost(id)}
           onDelete={() => deletePost(id)}
          key={id}
          title={title}
          description={body}
      />
      ))}
    </div>
  );
}

export default App;
