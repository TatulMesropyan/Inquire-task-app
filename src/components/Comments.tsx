import type {AnyAction} from "redux";
import type { Dispatch, Key} from 'react';
import type { commentedData } from "../redux/models";

import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";

import {openCommentsError, openCommentsPending, openCommentsSuccess} from "../redux/actions";
import SinglePost from "./SinglePost";
import SingleComment from "./SingleComment";


// @ts-ignore
const Comments = (postID: any): JSX.Element => {
    const dispatch: Dispatch<AnyAction> = useDispatch()
    // @ts-expect-error
    const data = useSelector(state => state.commentPostState)
    const {body, comments, title, id} = data || {};

    useEffect(() => {
        dispatch(openCommentsPending());
        axios.get(`https://blog-api-t6u0.onrender.com/posts/3?_embed=comments`).then((res) => {
            dispatch(openCommentsSuccess(res.data));
        }).catch(err => dispatch(openCommentsError()))

    }, [dispatch])
    console.log(data)
    return (
        <Box>
            <SinglePost hasControllers={false} description={body} title={title} postID={id}/>
            {comments?.map((comment: commentedData, index: Key | null) =>(
                        <SingleComment email={comment.email} body={comment.body} name={comment.name} id={id} key={index}/>
                        )

                    )}

                </Box>
            )
        }

export default Comments;