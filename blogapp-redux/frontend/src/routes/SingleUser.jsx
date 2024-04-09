import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List, ListItem, ListItemText,
} from "@mui/material";
import userService from "../services/users";

const SingleUser = () => {
  const urlParams = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    userService.getSingle(urlParams.id).then((userFromBackend) => {
      setUser(userFromBackend);
    });
  }, []);
  const headerStyle = {
    fontFamily: "Trebuchet MS, sans-serif",
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 style={headerStyle}>{user.name}</h2>
      <h3 style={headerStyle}>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <div key={blog.id}>
            <ListItem sx={{ outlineWidth: "10px", outline: 1, margin: "5px" }}>
              <ListItemText primary={blog.title} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default SingleUser;
