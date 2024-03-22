import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogData from "./BlogData";

const FullStories = () => {
  const { postId } = useParams(); // Get the postId from URL parameters
  const navigate = useNavigate();
  const [dynamicPost, setDynamicPost] = useState(null); // State for dynamic post details
  const [comments, setComments] = useState([]); // State for comments associated with the post

  // useEffect hook to fetch post details and associated comments when postId changes
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Fetch post details
        const response = await axios.get(`/api/posts/${postId}`);
        setDynamicPost(response.data); // Set post details in state
        const commentsResponse = await axios.get(
          `/api/comments/post/${postId}`
        );
        setComments(commentsResponse.data); // Set comments in state
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails(); // Invoke fetchPostDetails function
  }, [postId]); // This effect runs when postId changes

  // Event handler for deleting the post
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`); // Send delete request to delete the post
      navigate("/blog"); // Redirect to the blog page after successful deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to format date string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Render loading message if dynamicPost is not available yet
  if (!dynamicPost) {
    return <div>No post found</div>;
  }

  // Render the full post details
  return (
    <div className="bg-my-image bg-no-repeat bg-cover py-10 md:bg-cover">
      <div className="container mx-auto pb-14 bg-white rounded-md">
        <div className="font-rubik">
          <div className="flex blog-post">
            <div className="blog-post-content pt-16 flex flex-col w-1/2">
              <h2 className="text-3xl my-4">{dynamicPost.title}</h2>
              <p className="leading-loose">{dynamicPost.content}</p>
              <p>Posted on: {formatDate(dynamicPost.created_at)}</p>
              <Link to="/">
                <button className="bg-rose-500 px-3 my-5 text-white rounded-lg">
                  More Articles
                </button>
              </Link>
              <div className="flex">
                <Link to={`/edit-post/${dynamicPost.id}`}>
                  <button className="bg-rose-500 px-3 text-white rounded-lg">
                    Edit the post
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-rose-500 px-3 mx-3 text-white rounded-lg"
                >
                  Delete the post
                </button>
              </div>
            </div>
            {dynamicPost.image && (
              <div className="flex flex-col w-1/2">
                <img
                  src={dynamicPost.image}
                  className="w-1/2 mx-auto block pt-16"
                  alt=""
                />
                <h3 className="pt-4 pb-2">Comments:</h3>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="pb-2">
                      <p>{comment.content}</p>
                      <small>{formatDate(comment.created_at)}</small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullStories;
