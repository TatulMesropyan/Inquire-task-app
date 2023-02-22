import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
    interface postTypes{
        id:number,
        title:string,
        body: string,
    }
    const [posts,setPosts] = useState([])
    useEffect(() => {
    const getData = async () => {
        const response = await axios.get('https://blog-api-t6u0.onrender.com/posts')
        setPosts(response.data);
    }
        getData();
    },[])


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
