import type { AnyAction } from 'redux'
import type { Dispatch, Key, ChangeEvent } from 'react'
import type { commentedData, commentPostTypes, commentResponseTypes } from '../redux/models'
import type { AxiosResponse } from 'axios'
import type { RootState } from '../redux/store'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField } from '@mui/material'
import { AddComment } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import {
  addCommentError,
  addCommentPending,
  addCommentSuccess,
  openCommentsError,
  openCommentsPending,
  openCommentsSuccess,
} from '../redux/actions'
import SinglePost from './SinglePost/SinglePost'
import SingleComment from './SingleComment/SingleComment'
import PostActionDialog from './PostActionDialog/PostActionDialog'
import { TextArea as TextAreaAutoSize } from './PostActionDialog/components/TextArea'

interface IProps {
  postID: number
}

const Comments = ({ postID }: IProps): JSX.Element => {
  const dispatch: Dispatch<AnyAction> = useDispatch()
  const [dialog, setDialog] = useState<boolean>(false)
  const navigate = useNavigate()
  const data = useSelector<RootState, commentPostTypes>(
    (state: RootState) => state.commentPostState,
  )
  const { body, comments, title, id } = data || {}
  const [comment, setComment] = useState<{
    name: string
    email: string
    body: string
  }>({
    name: '',
    email: '',
    body: '',
  })

  useEffect(() => {
    if (postID) {
      dispatch(openCommentsPending())
      axios
        .get(`https://blog-api-t6u0.onrender.com/posts/${postID}?_embed=comments`)
        .then((res: AxiosResponse<commentResponseTypes>) => {
          dispatch(openCommentsSuccess(res.data))
        })
        .catch(() => dispatch(openCommentsError()))
    } else navigate('/')
  }, [dispatch, dialog])

  const commentPost = async (): Promise<void> => {
    dispatch(addCommentPending())
    await axios
      .post(`https://blog-api-t6u0.onrender.com/comments`, {
        ...comment,
        postId: postID,
      })
      .then(() => {
        dispatch(addCommentSuccess())
      })
      .catch(() => dispatch(addCommentError()))
    setComment({
      name: '',
      email: '',
      body: '',
    })
    setDialog(false)
  }
  const handleCommentFieldsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => setComment({ ...comment, [field]: e.target.value })
  return (
    <Box>
      <Button
        variant='contained'
        color='primary'
        sx={{ zIndex: '2', position: 'sticky', top: '15vh', left: '85vw' }}
        onClick={() => setDialog(true)}
      >
        <AddComment />
      </Button>
      {dialog && (
        <PostActionDialog
          headerText='Please enter your comments'
          controllers={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                justifyContent: 'space-between',
              }}
            >
              <TextField label='Name...' onChange={(e) => handleCommentFieldsChange(e, 'name')} />
              <TextField label='Email' onChange={(e) => handleCommentFieldsChange(e, 'email')} />
              <TextAreaAutoSize
                placeholder='Comment...'
                onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleCommentFieldsChange(e, 'body')
                }
              />
            </Box>
          }
          onClose={() => setDialog(false)}
          onSubmit={commentPost}
        />
      )}
      <SinglePost hasControllers={false} description={body} title={title} postID={id} />
      {comments?.map((comment: commentedData, index: Key | null) => (
        <SingleComment
          email={comment.email}
          body={comment.body}
          name={comment.name}
          id={id}
          key={index}
        />
      ))}
    </Box>
  )
}

export default Comments
