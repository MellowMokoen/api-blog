import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogData from "./BlogData";

// Component for displaying full stories including comments
const FullStories = () => {
  // Get the postId from the URL parameters
  const { postId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [dynamicPost, setDynamicPost] = useState(null); // State to store dynamic post data
  const [comments, setComments] = useState([]); // State to store comments for the post

  // Effect hook to fetch post data and comments when postId changes
  useEffect(() => {
    // Check if post exists in static data, if not, fetch from API
    const postFromBlogData = BlogData.find(
      (post) => post.id === parseInt(postId)
    );
    if (!postFromBlogData) {
      axios
        .get(`/api/posts/${postId}`)
        .then((response) => {
          setDynamicPost(response.data); // Set dynamic post data
          // Fetch comments for this post
          return axios.get(`/api/comments/post/${postId}`);
        })
        .then((response) => {
          setComments(response.data); // Set comments data
        })
        .catch((error) => {
          console.error("Error fetching post or comments:", error); // Log errors
        });
    } else {
      setDynamicPost(postFromBlogData); // Set dynamic post data from static data
      // Optionally, handle static posts comments if needed
    }
  }, [postId]); // Dependency array to run effect only when postId changes

  // Function to handle post deletion
  const handleDelete = () => {
    axios
      .delete(`/api/posts/${postId}`)
      .then(() => {
        navigate("/"); // Redirect to the homepage after deletion
      })
      .catch((error) => {
        console.error("Error deleting post:", error); // Log errors
      });
  };

  // Function to format the created_at timestamp
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render content based on dynamicPost and comments data
  if (!dynamicPost) {
    return <div>No post found</div>; // If no post found, render a message
  }

  // Render full story and comments
  return (
    <div className="bg-my-image bg-no-repeat bg-cover py-10 md:bg-cover">
      <div className="container mx-auto pb-14 bg-white rounded-md">
        <div className="font-rubik">
          <div className="flex blog-post">
            <div className="blog-post-content pt-16 flex flex-col w-1/2">
              {/* Render post title and content */}
              <h2 className="text-3xl my-4">{dynamicPost.title}</h2>
              <p className="leading-loose">
                {dynamicPost.content || dynamicPost.description}
              </p>
              <Link to="/">
                {/* Button to navigate to more articles */}
                <button className="bg-rose-500 px-3 my-5 text-white rounded-lg">
                  More Articles
                </button>
              </Link>
              <div className="flex">
                <Link to={`/edit-post/${dynamicPost.id}`}>
                  {/* Button to edit the post */}
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
            <div className="flex flex-col w-1/2">
              {/* Render post image */}
              {dynamicPost.image && (
                <img
                  src={dynamicPost.image}
                  className="w-1/2 mx-auto block pt-16"
                  alt=""
                />
              )}
              <div>
                <h3 className="pt-4 pb-2">Comments:</h3>
                {/* Render comments */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullStories; // Export FullStories component
