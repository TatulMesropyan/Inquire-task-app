import type {deletePostTypes, editPostTypes, stateTypes} from "./redux/models";

import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {Box, Button, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

import SinglePost from "./components/SinglePost/SinglePost";
import NewPostDialog from "./components/NewPostDialog/NewPostDialog";
import {getPostsError, getPostsPending, getPostsSuccess} from "./redux/actions/postsActions";
import {deletePostError, deletePostPending, deletePostSuccess} from "./redux/actions/deletePostActions";
import {TextArea as TextAreaAutoSize} from "./components/NewPostDialog/components/TextArea";
import './App.css';

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
    const {posts,status} = postsData || {}
    const [option,setOption] = useState<{action:string,postID:any}>({
        action: '',
        postID: null
    })
    const [post,setPost] = useState<{title: string; body: string}>({
        title: "",
        body: "",
    })
    const [comment, setComment] = useState<{ name: string, email: string, body:string}>({
        name:'',
        email:'',
        body:'',
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

    const addPost = async () => {
       await axios.post(`https://blog-api-t6u0.onrender.com/posts`,post).then((res) =>{
                 // setNewPostDialog(false)
            }
        ).catch(err =>{
            // setNewPostDialog(false)
        })
        setPost({title:'',body:''})
        setOption({action: '', postID:null});
    }

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => (
        setPost({...post,[field]:e.target.value})
)
    const handleCommentFieldsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => (
        setComment({...comment,[field]:e.target.value})
    )
    const deletePost = async (postID:number) => {
        dispatch(deletePostPending());
        await axios.delete(`https://blog-api-t6u0.onrender.com/posts/${postID}`).then(() =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
        setOption({action: '', postID:null});
    }

    const editPost = async (postID:number)=> {
        dispatch(deletePostPending());
        await axios.put(`https://blog-api-t6u0.onrender.com/posts/${postID}`,post).then(() =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
        setPost({title:'',body:''})
        setOption({action: '', postID:null});
    }

     const commentPost = async (postID:number) => {
         dispatch(deletePostPending());
        await axios.post(`https://blog-api-t6u0.onrender.com/posts/${postID}`,{...comment,postID}).then(() =>{

            }
        ).catch(err => dispatch(deletePostError()))
         setOption({action: '', postID:null});
    }

    return (
    <div className="App">
        <Button variant="contained" color='inherit' sx={{zIndex:'2',position:'sticky',top:'50vh',left:'13vh'}} onClick={() => setOption({action:'add', postID:null})}>
            <Add/>
        </Button>
        {option.action === 'edit' &&
			<NewPostDialog
                headerText={"Edit post"}
                controllers={<Box sx={{display:'flex',flexDirection:'column',gap:'50px',justifyContent:'space-between'}}>
                    <TextField label="Title..." onChange={(e) => handleFieldChange(e, 'title')}/>
                    <TextAreaAutoSize placeholder="Description..." onChange={(e :ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => handleFieldChange(e, 'body')}/>
                </Box>}
				onClose={() => setOption({action:'', postID: null})}
				onSubmit={() => editPost(option.postID)}/>
        }
        {option.action === 'add' &&
			<NewPostDialog
				headerText="Create new post"
				controllers={
                <Box sx={{display:'flex',flexDirection:'column',gap:'50px',justifyContent:'space-between'}}>
                    <TextField label="Title..." onChange={(e) => handleFieldChange(e, 'title')}/>
                    <TextAreaAutoSize placeholder="Description..." onChange={(e :ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => handleFieldChange(e, 'body')}/>
                </Box>}
				onClose={() => setOption({action:'', postID: null})}
				onSubmit={addPost}
            />
        }
        {option.action === 'delete' &&
			<NewPostDialog
				headerText="Are you sure you want Delete?"
				onClose={() => setOption({action:'', postID: null})}
				onSubmit={() => deletePost(option.postID)}
			/>
        }
        {option.action === 'addComment' &&
			<NewPostDialog
				headerText="Please enter your comments"
                controllers={
                <Box sx={{display:'flex',flexDirection:'column',gap:'50px',justifyContent:'space-between'}}>
                    <TextField label="Name..." onChange={(e) => handleCommentFieldsChange(e, 'name')}/>
                    <TextField label="Email" onChange={(e) => handleCommentFieldsChange(e,'email')}/>
                    <TextAreaAutoSize placeholder="Comment..." onChange={(e :ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => handleCommentFieldsChange(e, 'body')}/>
                </Box>}
				onClose={() => setOption({action:'', postID: null})}
				onSubmit={() => commentPost(option.postID)}
			/>
        }
    {posts?.map(({title,body,id}) => (
          <SinglePost
          onChoose={setOption}
          postID={id}
          key={id}
          title={title}
          description={body}
      />
      ))}
    </div>
  );
}

export default App;
