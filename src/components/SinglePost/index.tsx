import {PriorityHigh} from '@mui/icons-material';
import {Paper} from '@mui/material';

import {Description,Title,Content,PostContainer,Controllers} from "./components";

interface  IProps {
    onChoose: any,
    postID:number,
    title: string,
    description: string
}
const SinglePost = ({onChoose,postID,title,description}:IProps): JSX.Element => {
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
            <Controllers postID={postID} onChoose={onChoose}/>
        </PostContainer>
    )
}

export default SinglePost;