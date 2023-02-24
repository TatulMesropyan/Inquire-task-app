import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Telegram} from "@mui/icons-material";

import React from "react";

interface  IProps {
    headerText: string,
    onClose: () => void,
    onSubmit: any,
    controllers?: JSX.Element,
}
const PostActionDialog = ({headerText,onClose,onSubmit,controllers,...restProps}:IProps): JSX.Element => {
    return (
        <Dialog
            open={true}
            onClose={onClose}
            {...restProps}
        >
            <DialogTitle>
                {headerText}
            </DialogTitle>
            <DialogContent sx={{alignSelf:'center'}}>
                {controllers}
            </DialogContent>
            <DialogContent sx={{alignSelf:'center'}}>
                <Box sx={{display:'flex',flexDirection:'row',gap:'20px'}}>
                    <Button variant='contained' color='warning' onClick={onClose}>
                        Cancel
                    </Button>
                <Button onClick={onSubmit}>
                    Submit <Telegram/>
                </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default PostActionDialog;