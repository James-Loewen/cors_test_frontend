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