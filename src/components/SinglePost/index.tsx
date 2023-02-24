import type { SetStateAction,Dispatch } from 'react';

import {PriorityHigh} from '@mui/icons-material';
import {Paper} from '@mui/material';

import {Description,Title,Content,PostContainer,Controllers} from "./components";

interface  IProps {
    hasControllers?: boolean,
    onChoose?: Dispatch<SetStateAction<{action:string,postID:number}>>,
    postID: number,
    title: string,
    description: string,
}
const SinglePost = ({hasControllers=true,onChoose,postID,title,description}:IProps): JSX.Element => {
    return (
        <PostContainer>
            <Content>
            <Paper>
                <Title>
                    <PriorityHigh/>
                    {title}
                </Title>
                <Description>
                    {description}
                </Description>
            </Paper>
            </Content>
            {hasControllers &&
            <Controllers postID={postID} onChoose={onChoose}/>
            }
        </PostContainer>
    )
}

export default SinglePost;