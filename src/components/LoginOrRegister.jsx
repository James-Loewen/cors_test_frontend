import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logIn, registerUser, getCsrfToken } from "../utils/authUtils";

export const LoginOrRegister = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { csrfToken, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    let token = csrfToken;
    
    if (!csrfToken) {
      token = await getCsrfToken();
    }

    const data = await logIn(token, username, password);
    setUser(data.user);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let token = csrfToken;
    
    if (!csrfToken) {
      token = await getCsrfToken();
    }

    const data = await registerUser(token, username, password);
    setUser(data.user);
  }

  if (!register) {
    return (
      <>
        <form className="login-form" onSubmit={handleLogin}>
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
        <button onClick={() => setRegister(true)}>Or sign up</button>
      </>
    )
  } else {
    return (
      <>
        <form className="register-form" onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        <button onClick={() => setRegister(false)}>Or log in</button>
      </>
    )
  }
}