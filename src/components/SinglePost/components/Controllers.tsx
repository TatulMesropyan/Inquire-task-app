import {Button, Grid} from '@mui/material';
import {AddComment, Edit, Delete} from '@mui/icons-material';

interface IProps {
    postID:number
}

const Controllers = ({postID}: IProps): JSX.Element => {
    console.log(postID)
    return (
    <Grid container>
        <Grid item xs={4}>
            <Button onClick={() => {}}>
                <AddComment/>
            </Button>
        </Grid>
        <Grid item xs={4}>
            <Button onClick={() => {}}>
                <Edit/>
            </Button>
        </Grid>
        <Grid item xs={4}>
            <Button onClick={() => {}}>
                <Delete/>
            </Button>
        </Grid>
    </Grid>
    )
};

export default Controllers;