import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';

function EditBlog({ userId }) {
    const [comment, setComment] = useState({});
    const [authorId, setAuthorId] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    let { blogId, commentId } = useParams();

    const getComment = async () => {
        const data = await api.request("get", `/blogs/${blogId}/comments/${commentId}`);
        if (data) {
            setComment(data);
            setRating(data.rating);
            setReview(data.review);
            setAuthorId(data.author._id);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getComment()
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "put",
          `/blogs/${blogId}/comments/${commentId}`,
          {
            "rating": rating,
            "review": review
          },
          { "Content-Type": "application/json" }
        );
        if (res.status == 200) {
            alert("Comment changed!")
        }
    }
  
    return (
      <Row className="g-0">
        {
            comment ? (
                (authorId == userId) ? (
                  <div>
                    <Row className="g-0">
                      <Col md={4}></Col>
                      <Col md={4}>
                        <Container className="signupBox">
                          <Form onSubmit={e => handleSubmit(e)}>
                              <Row>
                                  <Label for="rating">Rating</Label>
                                  <Col md={10}>
                                      <Input type="number" name="rating" id="rating" 
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)} />
                                  </Col>
                              </Row>
                              <Row>
                                  <Label for="review">Review</Label>
                                  <Col md={10}>
                                      <Input type="textarea" name="review" id="review" 
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)} />
                                  </Col>
                              </Row>
                              <Row className="form-group">
                                  <Col md={4}></Col>
                                  <Col md={4}>
                                      <Button type='submit' color='danger' size="lg">Update review</Button>
                                  </Col>
                              </Row>     
                          </Form>
                        </Container>  
                      </Col>  
                    </Row>
                  </div>
              ) : (
                <div>
                    <h3>You can't change this comment!</h3>
                </div>
              )
            ) : (
              <div>
                  <h3>Comment is not loaded yet...</h3>
              </div>
            )
         }
      </Row>
    );
}

export default EditBlog;