import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function CommentTemplate({comment}) {
    return (
        <Container style={{'textAlign':'left', 'paddingBottom':'10px','borderBottom':'1px solid black'}}>
            <Row>
                <Col xs={6}><i>{comment.author.username}, {comment.rating}</i></Col>
                <Col xs={12} style={{'fontSize':'large'}}>{comment.review}</Col>
            </Row>
        </Container>
    );
}

export default CommentTemplate;