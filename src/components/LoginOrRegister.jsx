import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logIn, registerUser, getCsrfToken } from "../utils/authUtils";

export const LoginOrRegister = () => {
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    csrfToken,
    setCsrfToken,
    setUser,
  } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    let token = csrfToken;
    
    if (!csrfToken) {
      token = await getCsrfToken();
      setCsrfToken(token);
    }

    try {
      const data = await logIn(token, username, password);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let token = csrfToken;
    
    if (!csrfToken) {
      token = await getCsrfToken();
      setCsrfToken(token);
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password
    }

    const data = await registerUser(token, userData);
    setUser(data);
  }

  if (!register) {
    return (
      <>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-btn">Log In</button>
        </form>
        <button className="form-toggle-btn" onClick={() => setRegister(true)}>Or sign up</button>
      </>
    )
  } else {
    return (
      <>
        <form className="register-form" onSubmit={handleRegister}>
          <h2 className="register-form__heading">Fake info, please</h2>
          <label htmlFor="firstName">First name</label>
          <input
            required
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            required
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            required
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <button className="form-toggle-btn" onClick={() => setRegister(false)}>Or log in</button>
      </>
    )
  }
}