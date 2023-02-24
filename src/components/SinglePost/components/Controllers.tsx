import type {editPostTypes} from "../../../redux/models";
import type {commentPostTypes, deletePostTypes} from "../../../redux/models";

import {Box, Button, CircularProgress, Grid} from '@mui/material';
import {AddComment, Edit, Delete} from '@mui/icons-material';
import {useSelector} from "react-redux";

//TODO Fix Types

interface IProps {
    onChoose:any,
    postID: number
}

export const Controllers = ({onChoose,postID}: IProps): JSX.Element => {
    //@ts-ignore
    const editData: editPostTypes = useSelector(state => state.editPostState)
    const {editLoader} = editData || {};
    // @ts-ignore
    const deleteData: deletePostTypes = useSelector(state => state.deletePostState)
    const {deleteLoader} = deleteData || {};
    // @ts-ignore
    const commentData: commentPostTypes = useSelector(state => state.deletePostState)
    const {commentLoader} = commentData || {};
    return (
        <Box sx={{display:'flex',alignSelf:'center',marginTop:'1rem'}}>
    <Grid container>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'addComment',postID:postID})} disabled={commentLoader}>
                {commentLoader ?
                    <CircularProgress color='inherit' />
                    :
                    <AddComment color='action'/>
                }
            </Button>

        </Grid>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'edit',postID:postID})} disabled={editLoader}>
                {editLoader ?
                <CircularProgress color='inherit'/>
                    :
                <Edit color='action'/>
                }
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'delete',postID:postID})} disabled={deleteLoader}>
            {deleteLoader ?
                <CircularProgress color='inherit' size={24}/>
                :
                <Delete color='action'/>
            }
            </Button>
        </Grid>
    </Grid>
        </Box>
    )
};