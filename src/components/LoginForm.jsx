import { useState } from "react";
import { logIn, getCsrfToken } from "../utils/authUtils";
import { InputLabelGroup } from "./InputLabelGroup";

export const LoginForm = ({
  // objects
  csrfToken,
  username,
  password,

  // functions
  setUser,
  setCsrfToken,
  setUsername,
  setPassword
}) => {
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    let token = csrfToken;

    if (!csrfToken) {
      token = await getCsrfToken();
      setCsrfToken(token);
    }

    try {
      const userData = await logIn(token, username, password);
      token = await getCsrfToken();
      setUser(userData);
      setCsrfToken(token);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <InputLabelGroup
        required={true}
        autoCapitalize="off"
        type="text"
        label="Username"
        name="username"
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
        parentClassName="login-form"
        errorMsg={error}
      />
      <InputLabelGroup
        required={true}
        type="password"
        label="Password"
        name="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        parentClassName="login-form"
      />
      <button type="submit" className="submit-btn">Log In</button>
    </form>
  )
}