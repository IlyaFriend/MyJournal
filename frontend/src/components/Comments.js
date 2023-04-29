import { useState, useEffect, React} from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CommentTemplate from "./subcomponents/CommentTemplate";
import CreateComment from "./CreateComment";
import api from '../utils/Api';

function Comments({ blogId, userId, isAdmin }) {
    const [comments, setComments] = useState({});
    
    const onDelete = async (commentId) => {
        await api.request("delete", `/blogs/${blogId}/comments/${commentId}`);
    };

    const getComments = async () => {
        const data = await api.request("get", `/blogs/${blogId}/comments`);
        console.log(data)
        if (data) {
            setComments(data);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getComments()
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <CreateComment blogId={blogId}/>
            {
                comments.length > 0 ? (
                    comments.map(comment => <div>
                        <CommentTemplate comment={comment}/>
                        {
                            (comment.author._id == userId || isAdmin) && (
                                <Button color='danger' size="lg" onClick={e => onDelete(comment._id)}>Delete</Button>
                            )
                        }
                        {
                            (comment.author._id == userId) && (<NavLink to={`/edit-comment/${blogId}/${comment._id}`}>Edit</NavLink>)
                        }
                    </div>)
                ) : (
                    <h3>No comments...</h3>
                )
            }
        </div>
    );
}

export default Comments;