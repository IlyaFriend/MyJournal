import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import BlogTemplate from './subcomponents/BlogTemplate';
import api from '../utils/Api';

function Blogs ({userId, isAdmin}) {
    const [blogs, setBlogs] = useState([]);

    const onDelete = async (blogId) => {
        await api.request("delete", `/blogs/${blogId}`);
    };

    const getBlogs = async () => {
        const data = await api.request("get", `/blogs`);
        if (data) {
            setBlogs(data);
        }
    };
  
    useEffect((_) => {
        const intervalId = setInterval(() => {
            getBlogs();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);  

    return (
        <Container  className='marginTop20'>
            <Row>
                <Col sm={{ size: 4,  offset: 4 }}>
                {
                    blogs.length > 0 ? blogs.map(
                        (blog, idx) => <div key={idx}>
                            <BlogTemplate blog={blog} mini={true} />
                            {
                                (blog.writer._id == userId || isAdmin) && (
                                    <Button color='danger' size="lg" onClick={e => onDelete(blog._id)}>Delete</Button>
                                )
                            }
                        </div> 
                    ) : (<h1>No articels has been made yet</h1>)
                }
                </Col>
            </Row>
        </Container>
    )
}

export default Blogs;