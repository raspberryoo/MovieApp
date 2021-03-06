import React, {useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] =useState()
    const [OpenReply, setOpenReply] = useState(false)
    
    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.Value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id ,
            postId: props.postId,
            responseTo: props.comment._id
        }


        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                setCommentValue("")
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })

    }
    
    // 대댓글 나오게 하는 기능
    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ]

  return (
    <div>
        <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
    </div>
  )
}

export default SingleComment
