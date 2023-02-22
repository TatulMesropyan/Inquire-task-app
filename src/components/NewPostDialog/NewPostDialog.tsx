import {PriorityHigh} from '@mui/icons-material';
import {Dialog, TextareaAutosize, TextField} from "@mui/material";
import {ChangeEvent} from "react";

interface  IProps {
    onTitleChange: (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void ;
    onDescriptionChange:  (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
}
const NewPostDialog = ({onTitleChange, onDescriptionChange}:IProps): JSX.Element => {
    return (
        <Dialog open={true}>
           <TextField label="Title..." onChange={onTitleChange}/>
            <TextareaAutosize placeholder="Description..." onChange={onDescriptionChange}/>
        </Dialog>
    )
}

export default NewPostDialog;