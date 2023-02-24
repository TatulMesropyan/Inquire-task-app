import type {AnyAction} from "redux";
import type {ChangeEvent, Dispatch, SetStateAction} from 'react';

import {Box, TextField} from "@mui/material";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useState} from "react";

import {TextArea as TextAreaAutoSize} from "./PostActionDialog/components/TextArea";
import {deletePostError, deletePostPending, deletePostSuccess,editPostError, editPostPending, editPostSuccess,addCommentError, addCommentPending, addCommentSuccess,addPostError, addPostPending, addPostSuccess} from "../redux/actions";
import PostActionDialog from "./PostActionDialog";

interface  IOption {
    action: string,
    postID: number|null
}

interface IProps {
    setOption: Dispatch<SetStateAction<{ action: string; postID: any; }>>,
    option:IOption
}
// @ts-ignore
const PostsDialogs = ({setOption, option}:IProps) : JSX.Element => {
    const {action,postID} = option || {};
    const dispatch:Dispatch<AnyAction> = useDispatch();
    const [post,setPost] = useState<{title: string; body: string}>({
        title: "",
        body: "",
    })
    const [comment, setComment] = useState<{ name: string, email: string, body:string}>({
        name:'',
        email:'',
        body:'',
    })

    const deletePost = async ():Promise<void> => {
        dispatch(deletePostPending());
        await axios.delete(`https://blog-api-t6u0.onrender.com/posts/${postID}`).then((res) =>{
                dispatch(deletePostSuccess())
            }
        ).catch(err => dispatch(deletePostError()))
        setOption({action: '', postID:null});
    }

    const editPost = async ()=> {
        dispatch(editPostPending());
        await axios.put(`https://blog-api-t6u0.onrender.com/posts/${postID}`,post).then((res) =>{
                dispatch(editPostSuccess())
            }
        ).catch(err => dispatch(editPostError()))
        setPost({title:'',body:''})
        setOption({action: "", postID: null});
    }

    const commentPost = async ():Promise<void> => {
        dispatch(addCommentPending());
        await axios.post(`https://blog-api-t6u0.onrender.com/comments`, {...comment,postID}).then((res) =>{
                dispatch(addCommentSuccess());
            }
        ).catch(err => dispatch(addCommentError()))
        setComment({
            name:'',
            email:'',
            body:'',
        })
        setOption({action: "", postID: null});
    }
    const addPost = async ():Promise<void> => {
        dispatch(addPostPending());
        await axios.post(`https://blog-api-t6u0.onrender.com/posts`,post).then((res) =>{
                dispatch(addPostSuccess())
            }
        ).catch(err =>{
            dispatch(addPostError())
        })
        setPost({title:'',body:''})
        setOption({action: "", postID: null});
    }

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => (
        setPost({...post,[field]:e.target.value})
    )
    const handleCommentFieldsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => (
        setComment({...comment,[field]:e.target.value})
    )
        switch(action) {
            case('edit'): {
                return (
                    <PostActionDialog
                        headerText={"Edit post"}
                        controllers={
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '50px',
                                justifyContent: 'space-between'
                            }}>
                            <TextField label="Title..." onChange={(e) => handleFieldChange(e, 'title')}/>
                            <TextAreaAutoSize placeholder="Description..."
                                              onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleFieldChange(e, 'body')}/>
                        </Box>
                    }
                        onClose={() => setOption({action: '', postID: null})}
                        onSubmit={editPost}/>
                )
            }
            case('add'): {
                return (
                    <PostActionDialog
                        headerText="Create new post"
                        controllers={
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '50px',
                                justifyContent: 'space-between'
                            }}>
                                <TextField label="Title..." onChange={(e) => handleFieldChange(e, 'title')}/>
                                <TextAreaAutoSize placeholder="Description..."
                                                  onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleFieldChange(e, 'body')}/>
                            </Box>}
                        onClose={() => setOption({action: '', postID: null})}
                        onSubmit={addPost}
                    />
                )
            }
            case('delete'): {
                return (
                    <PostActionDialog
                        headerText="Are you sure you want Delete?"
                        onClose={() => setOption({action: '', postID: null})}
                        onSubmit={deletePost}
                    />
                )
            }
            case('addComment'): {
                return (
                    <PostActionDialog
                        headerText="Please enter your comments"
                        controllers={
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '50px',
                                justifyContent: 'space-between'
                            }}>
                                <TextField label="Name..." onChange={(e) => handleCommentFieldsChange(e, 'name')}/>
                                <TextField label="Email" onChange={(e) => handleCommentFieldsChange(e, 'email')}/>
                                <TextAreaAutoSize placeholder="Comment..."
                                                  onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleCommentFieldsChange(e, 'body')}/>
                            </Box>}
                        onClose={() => setOption({action: '', postID: null})}
                        onSubmit={commentPost}
                    />
                )
            }
        }

};

export default PostsDialogs;