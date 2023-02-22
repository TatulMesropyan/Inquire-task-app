import type {stateTypes} from "./redux/models";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {getPostsSuccess, getPostsPending, getPostsError} from "./redux/actions/postsActions";
import SinglePost from "./components/SinglePost/SinglePost";
import './App.css';

function App() {
    const dispatch = useDispatch()
    // @ts-ignore
    //TODO Fix state type issue
    const data:stateTypes = useSelector(state => state.postsState)
    const {loader, posts, errorMessage} = data || {};
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


  return (
    <div className="App">
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
