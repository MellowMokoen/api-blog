import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  // Define state variables using useState hook
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "", // State for image URL
  });

  // Use navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for input change
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Construct payload to be sent to server
      const payload = {
        title: post.title,
        content: post.content,
        image: post.image, // Include image URL
        added_via_form: true, // Mark the post as added via the form
      };

      // Send POST request to server to add new post
      await axios.post(`http://localhost:5000/api/posts`, payload);

      // Redirect to /blog route and signal to Blog.js to refresh the posts list
      navigate("/blog", { state: { refresh: true } });
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  // Render form to add a new post
  return (
    <div className="bg-my-image bg-no-repeat bg-cover py-10 md:bg-cover">
      <div className="container mx-auto my-10 pb-14 bg-white rounded-md">
        <h2 className="text-rose-500 text-2xl font-bold m-5">Add a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Post Title"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Post Content"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="text"
              placeholder="Image URL"
              name="image"
              value={post.image}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
