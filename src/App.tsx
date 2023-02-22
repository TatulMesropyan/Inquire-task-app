import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import SinglePost from "./components/SinglePost/SinglePost";
import './App.css';
import {getPostsSuccess, getPostsPending, getPostsError} from "./redux/actions/postsActions";
import {stateTypes} from "./redux/models";

function App() {
    const dispatch = useDispatch()
    // @ts-ignore
    const data:stateTypes = useSelector(state => state.postsState)
    const {loader, posts, errorMessage} = data || {};
    console.log(data)
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

    console.log(process.env.BACKEND_URL)

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
