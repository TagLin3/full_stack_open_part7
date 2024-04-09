import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Divider } from "@mui/material";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import Toggleable from "../components/Toggleable";
import BlogForm from "../components/BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { concatBlog, setBlogs } from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";

const Blogs = () => {
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsFromBackend = await blogService.getAll();
      blogsFromBackend.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(blogsFromBackend));
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    dispatch(setUser(JSON.parse(window.localStorage.getItem("loggedBlogListUser"))));
  }, []);

  const addBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility();
    const addedBlog = await blogService.addBlog(blogToAdd, user.token);
    dispatch(concatBlog(addedBlog));
    dispatch(setNotification(`a new blog ${addedBlog.title} added`));
    setTimeout(() => dispatch(setNotification(null)), 3000);
  };

  const headerStyle = {
    fontFamily: "Trebuchet MS, sans-serif",
  };

  return (
    <div>
      <List>
        <Divider />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </List>
      <h2 style={headerStyle}>create new</h2>
      <Toggleable
        buttonLabel="add blog"
        ref={blogFormRef}
        buttonId="viewBlogFormButton"
      >
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    </div>
  );
};

export default Blogs;
