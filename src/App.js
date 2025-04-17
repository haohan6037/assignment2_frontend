import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from "./components/Signup";
import Login from "./components/Login";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Navbar";
import BlogsDataService from "./services/blogs";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

function App() {
    const [user, setUser] = React.useState('');
    const [token, setToken] = React.useState('');
    const [error, setError] = React.useState('');

    // App.js
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken) {
            axios.defaults.headers.common["Authorization"] = `Token ${savedToken}`; // ✅ 注意前缀是 Token 不是 token
            setToken(savedToken);
            setUser(savedUser);
        }
    }, []);

    async function login(user = null) {
      try {
        const response = await BlogsDataService.login(user);
        const token = response.data.token || response.data.key;
        setToken(token);
        setUser(user.username);
        localStorage.setItem('token', token);
        localStorage.setItem('user', user.username);
        localStorage.setItem('userInfo', response.data.id);
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        setError(`Successfully Login as ${user.username}`);
      } catch (e) {
        console.log(e);
        setError(e.toString());
      }

    }

    async function logout() {
      setToken('')
      setUser('')
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
      localStorage.setItem('userInfo', '');
    }

    async function signup(page_user = null) {
        BlogsDataService.signup(page_user).then((response) => {
            setToken(response.data.token);
            console.log("signup token:" + token);
            setUser(page_user.username);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', page_user.username);
            localStorage.setItem('userInfo', response.data.id);
            setError(`Successfully signed up as ${page_user.username}`);
        }).catch(e => {
            console.log(e);
            // setError(e.toString());
        })
    }

    return (
        <div className="App">
            <Navbar bg="primary" variant="dark">
                <div className="container-fluid">
                    <Navbar.Brand>BlogApp</Navbar.Brand>
                    <Nav className="me-auto">
                        <Container>
                           <Link to={"/postList"} className="nav-link">Blogs</Link>
                            {user? (
                              <div>
                                <Link className="nav-link" onClick={logout}>Logout({user})</Link>
                              </div>
                            ): (
                              <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/signup" className="nav-link">Signup</Link>
                              </>
                            )}
                          </Container>
                    </Nav>
                </div>
            </Navbar>
            <div>
                {error && <div>{error}</div>}
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/signup" element={<Signup signup={signup}/>}/>
                </Routes>
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/login" element={<Login login={login}/>}/>
                </Routes>
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/createPost" element={<CreatePost createPost={CreatePost}/>}/>
                </Routes>
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/postDetail/:id" element={<PostDetail />}/>
                </Routes>
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/postList" element={<PostList postList={PostList}/>}/>
                </Routes>
            </div>

            <footer className="text-center text-lg-start bg-light text-muted mt-4">
                <div className="text-center p-4">© Copyright Anisha Baskota, Dianji Chen, Hao Han, Huashan Li
                </div>
            </footer>

        </div>
    );
}

export default App;
