import type {editPostTypes} from "../../../redux/models";
import type {commentPostTypes, deletePostTypes} from "../../../redux/models";

import {Button, CircularProgress, Grid} from '@mui/material';
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
    <Grid container sx={{textAlign:'right'}}>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'addComment',postID:postID})} disabled={commentLoader}>
                {commentLoader ?
                    <CircularProgress color='inherit'/>
                    :
                    <AddComment/>
                }
            </Button>

        </Grid>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'edit',postID:postID})} disabled={editLoader}>
                {editLoader ?
                <CircularProgress color='inherit'/>
                    :
                <Edit/>
                }
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button onClick={() => onChoose({action:'delete',postID:postID})} disabled={deleteLoader}>
            {deleteLoader ?
                <CircularProgress color='inherit' size={24}/>
                :
                <Delete/>
            }
            </Button>
        </Grid>
    </Grid>
    )
};