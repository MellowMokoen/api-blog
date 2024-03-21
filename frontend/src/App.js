import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Adjust the import path as per your file structure
import Blog from "./Components/Blog";
import FullStories from "./Components/FullStories";
import EditPost from "./Components/EditPost"; // Using EditPost for both adding and editing posts
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire Router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Blog />} />
          <Route path="/posts/:postId" element={<FullStories />} />
          {/* Use the same component for adding a new post and editing an existing post */}
          <Route path="/add-post" element={<EditPost />} />
          {/* Additional route for editing a post with a specific postId */}
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
