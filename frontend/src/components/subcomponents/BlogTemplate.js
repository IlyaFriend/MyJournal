import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function BlogTemplate({blog, mini}) {
    return (
        <Container>
         {
            mini ? (
                <Row className='blogTemplate miniBT marginBottom20'>
                    <Col sm={12} style={{'textAlign': 'left', 'paddingLeft': '61px'}}>
                        <h3>{blog.header}</h3>
                    </Col>
                    <Col sm={6} style={{'color': 'rgb(99, 99, 99)'}}>
                        <i>By {blog.writer ? blog.writer.username : (<b>Anonym</b>)} </i> 
                    </Col>
                    <Col sm={6} style={{'color': 'rgb(99, 99, 99)'}}>
                        topic: {blog.label}
                    </Col>
                    <NavLink to={`/blog/${blog._id}`}>Take a look</NavLink>
                </Row>
            ) : (
                <Row className='fullBT  marginBottom20'>
                    <Col sm={12} style={{'textAlign': 'left', 'paddingLeft': '61px'}}>
                        <h3>{blog.header}</h3>
                    </Col>
                    <Col sm={6} style={{'color': 'rgb(99, 99, 99)'}}>
                        <i>By {blog.writer ? blog.writer.username : (<b>Anonym</b>)}, {blog.label}</i> 
                    </Col>
                    <Col sm={12} >
                        {blog.article}
                    </Col>
                </Row>
            )
         }
        </Container>
    )
}

export default BlogTemplate;