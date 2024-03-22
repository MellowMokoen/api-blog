import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogData from "./BlogData";

export default function Blog() {
  // Define state variables using useState hook
  const [apiPosts, setApiPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect hook to fetch API posts on component mount
  useEffect(() => {
    const fetchApiPosts = async () => {
      try {
        // Fetch posts from API
        const response = await axios.get("/api/posts");
        setApiPosts(response.data); // Set API posts in state
      } catch (error) {
        console.error("Error fetching posts from API:", error);
      }
    };

    fetchApiPosts(); // Invoke fetchApiPosts function
  }, []); // Empty dependency array means this effect runs once on mount

  // Event handler for logout button
  const handleLogout = () => {
    navigate("/login");
  };
  // Combine API posts and static BlogData, ensuring API posts are on top
  const combinedPosts = [...apiPosts, ...BlogData];

  // Render blog page
  return (
    <div className="bg-my-image bg-no-repeat bg-cover overflow-hidden py-10 h-screen md:bg-cover">
      <div className="container mx-auto pb-14 bg-white rounded-md">
        <div className="flex">
          <div className="flex flex-col w-1/2 font-rubik">
            <div className="py-10 px-5">
              <ul className="nav justify-content-start">
                <li className="nav-item">
                  <Link to="/add-post">
                    <button className="bg-green-500 px-3 py-1 text-white rounded-lg mr-3">
                      Add a Post
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="bg-rose-500 px-3 py-1 text-white rounded-lg"
                  >
                    Log Out
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/posts/3">Travel</Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts/1">Technology</Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts/2">Food</Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts/4">Exercise</Link>
                </li>
              </ul>
              <div className="text-5xl text-center font-pacifico py-24">
                Best of the week
              </div>
              <input
                type="search"
                className="rounded-full mx-auto block py-2.5 px-28 text-sm my-20 border-2 border-black outline-none animate-bounce"
                placeholder="Read about..."
              />
              <ul className="flex justify-between">
                <li className="bg-rose-600 text-white px-4 rounded-md cursor-pointer">
                  Popular
                </li>
                <li className="bg-rose-600 text-white px-4 rounded-md cursor-pointer">
                  Trending
                </li>
                <li className="bg-rose-600 text-white px-4 rounded-md cursor-pointer">
                  Latest
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <div className="py-10 px-5">
              <div className="bg-white font-rubik rounded-lg border px-10 pb-12 shadow-inner shadow-black overflow-y-auto no-scrollbar h-dvh w-full">
                {combinedPosts.map((post, index) => (
                  <div key={index} className="blog-post">
                    {" "}
                    <div className="blog-post-content">
                      <h2 className="text-md mt-4">{post.title}</h2>
                      <Link to={`/posts/${post.id}`}>
                        <button className="btn my-4 bg-rose-500 text-white">
                          Read More
                        </button>
                      </Link>
                    </div>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="stretched-image pb-10 blog-post-image size-32"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
