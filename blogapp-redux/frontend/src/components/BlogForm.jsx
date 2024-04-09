import { useState } from "react";
import { Button, TextField } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <TextField
        sx={{ margin: "5px" }}
        variant="outlined"
        label="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        id="title"
      />
      <br />
      <TextField
        sx={{ margin: "5px" }}
        variant="outlined"
        label="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        id="author"
      />
      <br />
      <TextField
        sx={{ margin: "5px" }}
        variant="outlined"
        label="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        id="url"
      />
      <br />
      <Button
        sx={{ margin: "5px" }}
        variant="outlined"
        type="submit"
        id="blogCreateButton"
        color="success"
      >
        create
      </Button>
    </form>
  );
};

export default BlogForm;
