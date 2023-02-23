import type {ChangeEvent} from "react";

import {Box, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Telegram} from "@mui/icons-material";

import {TextArea as TextAreaAutoSize} from "./components/TextArea";

interface  IProps {
    isLoading?: boolean,
    onTitleChange: (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => any ;
    onDescriptionChange:  (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => any;
    onClose: () => any,
    onSubmit:() => any,
}
const NewPostDialog = ({isLoading, onTitleChange, onDescriptionChange, onClose, onSubmit}:IProps): JSX.Element => {
    return (
        <Dialog
            open={true}
            onClose={onClose}
        >
            <DialogTitle>
                Create new post
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:'flex',flexDirection:'column',gap:'50px',justifyContent:'space-between'}}>
           <TextField label="Title..." onChange={onTitleChange}/>
            <TextAreaAutoSize placeholder="Description..." onChange={onDescriptionChange}/>
                    <LoadingButton onClick={onSubmit} loading={isLoading}>
                        Submit <Telegram/>
                    </LoadingButton>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewPostDialog;