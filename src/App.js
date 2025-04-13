import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from "./components/Signup";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Navbar";
import BlogsDataService from "./services/blogs";
import axios from "axios";

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

  async function signup(page_user = null) {
      BlogsDataService.signup(page_user).then((response) => {
        setToken(response.data.token);
        console.log("signup token:"+token);
        setUser(page_user.username);
        console.log(user)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', page_user.username);
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
            <Link to={"/blogs"} className="nav-link">Blogs</Link>

                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>

          </Container>
        </Nav>
      </div>
    </Navbar>
      <div>
        {error && <div>{error}</div>}
      </div>
      <div className="container mt-4">
        <Routes>
          <Route path="/signup" element={<Signup signup={signup} />} />
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
