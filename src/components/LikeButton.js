import React, { useState } from "react";
import BlogsDataService from "../services/blogs";

function LikeButton({ postId, initialLiked, initialCount, token }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = async () => {
    try {
      const response = await BlogsDataService.likePost(postId, token);
      setLiked(response.data.liked);
      setLikeCount(response.data.like_count);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button onClick={handleLike}>
      <span>{liked ? "💔 Cancel" : "❤️ Like"}</span>
  <span> {likeCount}</span>
    </button>
  );
}

export default LikeButton;
