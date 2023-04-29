import { React, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import BlogTemplate from './BlogTemplate';
import Comments from '../Comments';
import api from '../../utils/Api';

function Blog ({userId, isAdmin}) {
    const [blog, setBlog] = useState({});
    const [blogAuthorId, setBlogAuthorId] = useState(null);
    let { blogId } = useParams();
    
    const getBlog = async () => {
        const data = await api.request("get", `/blogs/${blogId}`);
        if (data) {
            setBlog(data);
            setBlogAuthorId(data.writer._id);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getBlog();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container>
         {
            blog ? (
                <Row>
                    <Col sm={{ size: 8,  offset: 0 }} className='blogTemplate fullBT'>
                        <BlogTemplate blog={blog} mini={false}/>
                        {
                            (blogAuthorId == userId) && (<NavLink to={`/edit-blog/${blogId}`}>Edit</NavLink>)
                        }
                    </Col>
                    <Col sm={4}>
                        <Comments blogId={blogId} userId={userId} isAdmin={isAdmin}/>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <h3>Blog is not loaded yet...</h3>
                </Row>
            )
         }
        </Container>
    )
}

export default Blog;