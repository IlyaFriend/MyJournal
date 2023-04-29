import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';

function EditBlog({ userId }) {
    const [blog, setBlog] = useState({});
    const [authorId, setAuthorId] = useState("");
    const [header, setHeader] = useState("");
    const [article, setArticle] = useState("");
    const [label, setLabel] = useState("");
    let { blogId } = useParams();

    const getBlog = async () => {
        const data = await api.request("get", `/blogs/${blogId}`);
        if (data) {
            setBlog(data);
            setHeader(data.header);
            setArticle(data.article);
            setLabel(data.label);
            setAuthorId(data.writer._id);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getBlog();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "put",
          `/blogs/${blog._id}`,
          {
            "header": header,
            "article": article,
            "label": label
          },
          { "Content-Type": "application/json" }
        );
        if (res.status == 200) {
            alert("Article changed!")
        }
    }
  
    return (
      <Row className="g-0">
        {
            blog ? (
                (authorId == userId) ? (
                  <div>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <Container className="signupBox">
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Row className="form-group">
                                <Label htmlFor="header" md={2}>Header</Label>
                                <Col md={10}>
                                    <Input type="text" name="header" id="header" 
                                          value={header}
                                          onChange={(e) => setHeader(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Label for="exampleText">Text Area</Label>
                                <Col md={10}>
                                    <Input type="textarea" name="article" id="article" 
                                          value={article}
                                          onChange={(e) => setArticle(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="label" md={2}>Label</Label>
                                <Col md={10}>
                                    <Input type="select" name="label" id="label"
                                            value={label}
                                            onChange={(e) => setLabel(e.target.value)}
                                            defaultValue={label}>
                                      <option value={""}>No label</option>
                                      <option value={"Culinary"}>Culinary</option>
                                      <option value={"Travelling"}>Travelling</option>
                                      <option value={"Education"}>Education</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={4}></Col>
                                <Col md={4}>
                                    <Button type='submit' color='danger' size="lg">Update Article</Button>
                                </Col>
                            </Row>     
                        </Form>
                      </Container>  
                    </Col>
                  </div>
              ) : (
                <div>
                    <h3>You can't change this blog!</h3>
                </div>
              )
            ) : (
              <div>
                  <h3>Blog is not loaded yet...</h3>
              </div>
            )
         }
      </Row>
    );
}

export default EditBlog;