import { registerUser, getCsrfToken } from "../utils/authUtils";
import { InputLabelGroup } from "./InputLabelGroup";

export const RegisterForm = ({
  // objects
  csrfToken,
  firstName,
  lastName,
  username,
  password,
  password2,

  // functions
  setUser,
  setCsrfToken,
  setFirstName,
  setLastName,
  setUsername,
  setPassword,
  setPassword2,
}) => {
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.error("Passwords don't match");
      return;
    }

    let token = csrfToken;

    if (!csrfToken) {
      token = await getCsrfToken();
      setCsrfToken(token);
    }

    const reqBody = {
      first_name: firstName,
      last_name: lastName,
      username,
      password
    }

    try {
      const userData = await registerUser(token, reqBody);
      token = await getCsrfToken();
      setUser(userData);
      setCsrfToken(token);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2 className="register-form__heading">Fake info, please</h2>
      <InputLabelGroup
        required={true}
        type="text"
        label="First name"
        name="firstName"
        value={firstName}
        handleChange={(e) => setFirstName(e.target.value)}
        parentClassName="register-form"
      />
      <InputLabelGroup
        required={true}
        type="text"
        label="Last name"
        name="lastName"
        value={lastName}
        handleChange={(e) => setLastName(e.target.value)}
        parentClassName="register-form"
      />
      <InputLabelGroup
        required={true}
        type="text"
        label="Username"
        name="username"
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
        parentClassName="register-form"
        autoCapitalize="off"
      />
      <InputLabelGroup
        required={true}
        type="password"
        label="Password"
        name="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        parentClassName="register-form"
      />
      <InputLabelGroup
        required={true}
        type="password"
        label="Confirm password"
        name="confirm-password"
        value={password2}
        handleChange={(e) => setPassword2(e.target.value)}
        parentClassName="register-form"
      />
      <button type="submit" className="submit-btn">Register</button>
    </form>
  )
}