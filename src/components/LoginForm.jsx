import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn, getCsrfToken } from "../utils/authUtils";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { csrfToken, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = csrfToken;
    
    if (!csrfToken) {
      token = await getCsrfToken();
    }

    const data = await LogIn(token, username, password);
    setUser(data.user);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  )
}