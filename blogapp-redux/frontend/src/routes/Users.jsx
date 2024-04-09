import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Button,
} from "@mui/material";
import userService from "../services/users";
import { setUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    userService.getAll().then((usersFromBackend) => {
      dispatch(setUsers(usersFromBackend));
    });
  }, []);
  const headerStyle = {
    fontFamily: "Trebuchet MS, sans-serif",
  };
  return (
    <div>
      <h2 style={headerStyle}>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell><Button href={`/users/${user.id}`}>{user.name}</Button></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
