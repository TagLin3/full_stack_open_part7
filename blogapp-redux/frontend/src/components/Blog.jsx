import PropTypes from "prop-types";
import {
  ListItem, ListItemText, ListItemButton, Avatar, ListItemAvatar, Divider,
} from "@mui/material";
import { Book } from "@mui/icons-material";

const Blog = ({ blog }) => (
  <div className="blog">
    <ListItem>
      <ListItemAvatar>
        <Avatar variant="square" sx={{ bgcolor: "#000000" }}>
          <Book />
        </Avatar>
      </ListItemAvatar>
      <ListItemButton href={`blogs/${blog.id}`}>
        <ListItemText primary={blog.title} secondary={blog.user.name} />
      </ListItemButton>
    </ListItem>
    <Divider />
  </div>
);

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
