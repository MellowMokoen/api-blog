import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./Components/Blog";
import FullStories from "./Components/FullStories";
import AddPost from "./Components/AddPost"; // Assuming you have an AddPost component for creating new posts

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/posts/:postId" element={<FullStories />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
