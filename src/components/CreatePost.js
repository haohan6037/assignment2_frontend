import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
import BlogsDataService from "../services/blogs";

const CreatePost = (props) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [category, setCategory] = React.useState('Tech');
    const [err, setErr] = useState()

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    const handleCreate = () => {
        let data = JSON.stringify({
            "title": title,
            "content": content,
            "category": category
        });

        BlogsDataService.createPost(data)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setErr("Successfully created post")
            })
            .catch((error) => {
                console.log(error);
                setErr("Failed to create post")
            });

    };


    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Write your post content here"
                        value={content}
                        onChange={handleContentChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={category} onChange={handleCategoryChange}>
                        <option value="Tech">Tech</option>
                        <option value="Life">Life</option>
                        <option value="Study">Study</option>
                        <option value="Travel">Travel</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" onClick={handleCreate}>
                    Create Post
                </Button>
                <p>{err}</p>
            </Form>
        </Container>
    );
};

export default CreatePost;
