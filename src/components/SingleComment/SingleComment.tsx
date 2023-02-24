import { Box } from '@mui/material'
import { Description as CommentDescription } from '../SinglePost/components'
import { AccountCircle } from '@mui/icons-material'
import { PersonalInfo } from './components/PersonalInfo'

interface IProps {
  name: string
  email: string
  body: string
  id: number
}
const SingleComment = ({ name, email, body, id }: IProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PersonalInfo>
        <AccountCircle />
        <div>{name}</div>
        <>{email}</>
      </PersonalInfo>
      <CommentDescription>{body}</CommentDescription>
    </Box>
  )
}

export default SingleComment
