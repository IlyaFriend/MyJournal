import {React, useState} from 'react';
import { Container, Col, Row, Button, Form, Input, Label } from 'reactstrap';
import api from '../utils/Api';

function CreateBlog() {
    const [header, setHeader] = useState("");
    const [article, setArticle] = useState("");
    const [label, setLabel] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.request(
          "post",
          `/blogs/`,
          {
            "header": header,
            "article": article,
            "label": label
          },
          { "Content-Type": "application/json" }
        );
        if (res.status == 201) {
            alert("Article created!")
        }
    }
  
    return (
      <Container className="createBlogBox blogTemplate">
        <Form onSubmit={e => handleSubmit(e)}>
            <Row className="form-group marginTop20 marginBottom20">
                <Label htmlFor="header" md={2}>Header</Label>
                <Col md={10}>
                    <Input type="text" name="header" id="header" 
                          value={header}
                          onChange={(e) => setHeader(e.target.value)} />
                </Col>
            </Row>
            <Row className='form-group marginBottom20'>
                <Col md={12}>
                    <Input type="textarea" name="article" id="article" 
                          value={article} style={{'height': '200px'}}
                          onChange={(e) => setArticle(e.target.value)} />
                </Col>
            </Row>
            <Row className="form-group marginBottom20">
                <Label htmlFor="label" md={2}>Label</Label>
                <Col md={10}>
                    <Input type="select" name="label" id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            defaultValue={""}>
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
                    <Button type='submit' color='danger' size="lg">Create Article</Button>
                </Col>
            </Row>     
        </Form>
      </Container>
    );
}

export default CreateBlog;