import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogsDataService from "../services/blogs";
import LikeButton from './LikeButton';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = localStorage.getItem('userInfo');
  const savedToken = localStorage.getItem('token');
  useEffect(() => {

    BlogsDataService.postList()
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const deletePost = (id) => {
        BlogsDataService.deletePost(id, savedToken).then(response => {
            //retrieveTodos();
            console.log("Post deleted", id);
        }).catch(e => {
            console.log(e);
        });
    }

  if (loading) {
    return <div className="text-center mt-4"><Spinner animation="border" /> Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4 text-center">Failed to load posts.</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Blog Posts</h2>
      <Link to={"/createPost"}>Create Post</Link>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>
                <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                  Category: {post.category} | Updated: {new Date(post.updated_at).toLocaleString()}
              </Card.Subtitle>
              <Card.Text>
                {post.content}
              </Card.Text>
              {currentUser && String(post.author) === String(currentUser) && (
                <Button variant="outline-danger" className="m-2" onClick={()=>deletePost(post.id)}>Delete</Button>
              )}

                <LikeButton postId={post.id} initialLiked={post.liked_by_user} initialCount={post.likes_count} token={savedToken} />
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostList;
