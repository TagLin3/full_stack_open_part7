import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography, IconButton, TextField, Button, List, ListItem, ListItemText,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { addOneLikeToBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const urlParams = useParams();

  useEffect(() => {
    blogService.getSingle(urlParams.id).then((blogFromBackend) => setBlog(blogFromBackend));
  }, []);

  const likeBlog = async () => {
    await blogService.addOneLike(blog);
    dispatch(addOneLikeToBlog(blog));
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const submitComment = async (event) => {
    event.preventDefault();
    setBlog({ ...blog, comments: blog.comments.concat(event.target.comment.value) });
    blogService.addComment(blog.id, event.target.comment.value);
    event.target.comment.value = "";
  };
  const headerStyle = {
    fontFamily: "Trebuchet MS, sans-serif",
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2 style={headerStyle}>{blog.title}</h2>
      <Typography>
        {blog.url}
        <br />
        {blog.likes}
        {" "}
        likes
        {" "}
        <IconButton
          type="button"
          onClick={likeBlog}
        >
          <ThumbUp />
        </IconButton>
        <br />
        added by
        {" "}
        {blog.user.name}
      </Typography>
      <h3 style={headerStyle}>comments</h3>
      <form onSubmit={submitComment}>
        <TextField label="comment" type="text" name="comment" />
        <br />
        <Button variant="outlined" type="submit">add comment</Button>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment} sx={{ outlineWidth: "10px", outline: 1, margin: "5px" }}>
            <ListItemText>{comment}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SingleBlog;
