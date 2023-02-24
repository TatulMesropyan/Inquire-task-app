import type { editPostTypes, commentPostTypes, deletePostTypes } from '../../../redux/models'
import type { RootState } from '../../../redux/store'

import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { Edit, Delete, ForumOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  onChoose?: any
  postID: number
}

export const Controllers = ({ onChoose, postID }: IProps): JSX.Element => {
  const navigate = useNavigate()
  const editData: editPostTypes = useSelector<RootState, editPostTypes>(
    (state) => state.editPostState,
  )
  const { editLoader } = editData || {}
  const deleteData: deletePostTypes = useSelector<RootState, deletePostTypes>(
    (state) => state.deletePostState,
  )
  const { deleteLoader } = deleteData || {}

  const openCommentsChoose = useCallback(() => {
    onChoose({ action: 'openComments', postID: postID })
    navigate('/comments')
  }, [navigate, onChoose, postID])

  return (
    <Box sx={{ display: 'flex', alignSelf: 'center', marginTop: '1rem' }}>
      <Grid container>
        <Grid item xs={3}>
          <Button
            onClick={() => onChoose({ action: 'edit', postID: postID })}
            disabled={editLoader}
          >
            {editLoader ? <CircularProgress color='inherit' /> : <Edit color='action' />}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() => onChoose({ action: 'delete', postID: postID })}
            disabled={deleteLoader}
          >
            {deleteLoader ? (
              <CircularProgress color='inherit' size={24} />
            ) : (
              <Delete color='action' />
            )}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={openCommentsChoose} disabled={deleteLoader}>
            {deleteLoader ? (
              <CircularProgress color='inherit' size={24} />
            ) : (
              <ForumOutlined color='action' />
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
