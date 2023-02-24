import type {deletePostTypes, editPostTypes, stateTypes} from "./redux/models";

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";

import SinglePost from "./components/SinglePost/SinglePost";
import {getPostsError, getPostsPending, getPostsSuccess} from "./redux/actions/postsActions";
import './App.css';
import PostsDialogs from "./components";

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


    useEffect(() => {
            dispatch(getPostsPending());
            axios.get(`https://blog-api-t6u0.onrender.com/posts`).then((res) =>{
                let posts = res.data;
                dispatch(getPostsSuccess(posts))
                }
            ).catch(err => dispatch(getPostsError(err.message)))
        }
    ,[dispatch, deleteLoader,editLoader])


    return (
    <div className="App">
        <Button variant="contained" color='inherit' sx={{zIndex:'2',position:'sticky',top:'50vh',left:'13vh'}} onClick={() => setOption({action:'add', postID:null})}>
            <Add/>
        </Button>
        <PostsDialogs setOption={setOption} option={option}/>
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
