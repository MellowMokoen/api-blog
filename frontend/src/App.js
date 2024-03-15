import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./Components/Blog";
import FullStories from "./Components/FullStories";
import EditPost from "./Components/EditPost"; // Using EditPost for both adding and editing posts

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/posts/:postId" element={<FullStories />} />
        {/* Use the same component for adding a new post and editing an existing post */}
        <Route path="/add-post" element={<EditPost />} />
        {/* Additional route for editing a post with a specific postId */}
        <Route path="/edit-post/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
