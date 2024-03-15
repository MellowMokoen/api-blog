import { useParams, Link } from "react-router-dom";
import BlogData from "./BlogData";

const FullStories = () => {
  const { postId, category } = useParams();

  // Filter BlogData based on postId or category
  const filteredPosts = postId
    ? BlogData.filter((post) => post.id === parseInt(postId))
    : category
    ? BlogData.filter((post) => post.category === category)
    : [];

  if (filteredPosts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="bg-my-image bg-no-repeat bg-cover py-10 md:bg-cover">
      <div className="container mx-auto pb-14 bg-white rounded-md">
        <div className="flex">
          <div className="py-10 px-5">
            <ul className="nav justify-content-start">
              <button className="bg-rose-500 px-3 text-white rounded-lg">
                Log In
              </button>
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
            <div className="font-rubik">
              {filteredPosts.map((post) => (
                <div key={post.id} className="flex blog-post">
                  <div className="blog-post-content pt-16 flex flex-col w-1/2">
                    <h2 className="text-3xl my-4">{post.title}</h2>
                    <p className="leading-loose">{post.description}</p>
                    <Link to="/">
                      <button className="bg-rose-500 px-3 my-5 text-white rounded-lg">
                        More Articles
                      </button>
                    </Link>
                    <div className="flex">
                      <Link to="">
                        <button className="bg-rose-500 px-3  text-white rounded-lg">
                          Edit the post
                        </button>
                      </Link>
                      <Link to="">
                        <button className="bg-rose-500 px-3 mx-3 text-white rounded-lg">
                          Delete the post
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <img
                      src={post.image}
                      className="w-1/2 mx-auto block pt-16"
                      alt=""
                    />
                    <p className="text-sm py-4 text-center">{post.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullStories;
