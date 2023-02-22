import {PriorityHigh} from '@mui/icons-material';
import {Description} from "./components/Description";
import {PostContainer} from "./components/PostContainer";
import {Title} from "./components/Title";
import { Content } from './components/Content';
import Controllers from './components/Controllers';

interface  IProps {
    title: string,
    description: string
    postID: number,
}
const SinglePost = ({title,description,postID}:IProps): JSX.Element => {
    return (
        <PostContainer>
            <Content>
                <Title>
                    <PriorityHigh/>
                    {title}
                </Title>
                <Description>
                    {description}
                </Description>
            </Content>
            <Controllers postID={postID} />
        </PostContainer>
    )
}

export default SinglePost;