import { useState } from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = ({ logIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    logIn({ username, password });
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <Button type="submit" id="loginButton" variant="outlined">login</Button>
    </form>
  );
};

export default LoginForm;
