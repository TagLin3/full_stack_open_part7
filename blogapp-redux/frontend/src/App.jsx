import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppBar, Toolbar, Button, Typography,
} from "@mui/material";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import Users from "./routes/Users";
import Blogs from "./routes/Blogs";
import SingleUser from "./routes/SingleUser";
import SingleBlog from "./routes/SingleBlog";

const App = () => {
  const notification = useSelector((store) => store.notification);
  const user = useSelector((store) => store.user);
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

  const logIn = async (credentials) => {
    try {
      const userFromBackend = await loginService.login(credentials);
      dispatch(setUser(userFromBackend));
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(userFromBackend));
      dispatch(setNotification(null));
    } catch (error) {
      dispatch(setNotification("wrong username or password"));
      setTimeout(() => dispatch(setNotification(null)), 3000);
    }
  };

  const logOut = async () => {
    window.localStorage.removeItem("loggedBlogListUser");
    dispatch(setUser(null));
  };

  const headerStyle = {
    fontFamily: "Trebuchet MS, sans-serif",
  };

  if (user === null) {
    return (
      <div>
        <h2 style={headerStyle}>Log in to application</h2>
        {(notification !== "") && (
          <div>
            <p>{notification}</p>
          </div>
        )}
        <LoginForm logIn={logIn} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppBar>
        <Toolbar>
          <Button href="/" color="inherit">blogs</Button>
          <Button href="/users" color="inherit">users</Button>
          <Typography sx={{ marginLeft: "10px" }}>
            {user.name}
            {" "}
            logged in
          </Typography>
          <Button color="inherit" type="button" onClick={logOut}>log out</Button>
        </Toolbar>
      </AppBar>
      <h2 style={headerStyle}>blog app</h2>
      {(notification !== "") && (
        <div>
          <p>{notification}</p>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
