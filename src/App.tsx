import type { RootState } from './redux/store'
import type { deletePostTypes, editPostTypes, postsTypes, stateTypes } from './redux/models'
import type { AnyAction } from 'redux'

import { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import SinglePost from './components/SinglePost/SinglePost'
import PostsDialogs from './components/PostsDialogs'
import { getPostsError, getPostsPending, getPostsSuccess } from './redux/actions'
import './App.css'
import Comments from './components/Comments'

function App() {
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /*eslint-disable @typescript-eslint/no-unsafe-return */

  const dispatch: Dispatch<AnyAction> = useDispatch()
  const editData: editPostTypes = useSelector<RootState, editPostTypes>(
    (state: RootState) => state.editPostState,
  )
  const { editStatus, editLoader } = editData || {}
  const deleteData: deletePostTypes = useSelector<RootState, deletePostTypes>(
    (state: RootState) => state.deletePostState,
  )
  const { deleteStatus, deleteLoader } = deleteData || {}
  const postsData: stateTypes = useSelector<RootState, stateTypes>(
    (state: RootState) => state.postsState,
  )
  const { posts, addLoader } = postsData || {}
  const [option, setOption] = useState<{ action: string; postID: number }>({
    action: '',
    postID: 0,
  })
  useEffect(() => {
    dispatch(getPostsPending())
    axios
      .get(`https://blog-api-t6u0.onrender.com/posts`)
      .then((res) => {
        dispatch(getPostsSuccess((res.data = [])))
      })
      .catch(() => dispatch(getPostsError()))
  }, [dispatch, deleteLoader, editLoader, addLoader])
  return (
    <div className='App'>
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <PostsDialogs setOption={setOption} option={option} />
              {posts?.map(
                (post) =>
                  !!post && (
                    <SinglePost
                      onChoose={setOption}
                      postID={post.id}
                      key={post.id}
                      title={post.title}
                      description={post.body}
                    />
                  ),
              )}
            </>
          }
        />
        <Route path={'/comments'} element={<Comments postID={option.postID} />} />
      </Routes>
    </div>
  )
}

export default App
