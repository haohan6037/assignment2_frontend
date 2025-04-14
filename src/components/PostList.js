import React from 'react';
import {Link} from "react-router-dom";

function PostList(props) {
    return (
        <div>
            <label>Create Post</label>
            <Link to={"/createPost"}>Create Post</Link>
        </div>
    );
}

export default PostList;