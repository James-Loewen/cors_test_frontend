import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthFormWrapper = () => {
  const [selectedForm, setSelectedForm] = useState('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const {
    csrfToken,
    setCsrfToken,
    setUser,
  } = useAuth();

  const toggleForm = (e) => {
    if (e.target.id === `${selectedForm}-btn`) {
      return;
    }

    if (selectedForm === 'login') {
      setSelectedForm('register');
    } else {
      setSelectedForm('login');
    }
  }

  return (
    <>
      <ul className="form-toggle-tabs">
        <li className={selectedForm === 'login' ? 'active' : null}>
          <button
            id="login-btn"
            onClick={toggleForm}
          >Login</button>
        </li>
        <li className={selectedForm === 'register' ? 'active' : null}>
          <button
            id="register-btn"
            onClick={toggleForm}
          >Register</button>
        </li>
      </ul>
      <div className="auth-form-wrapper">
        {selectedForm === 'login' ? (
          <LoginForm {...{
            username,
            setUsername,
            password,
            setPassword,
            csrfToken,
            setCsrfToken,
            setUser,
          }} />
        ) : (
        <RegisterForm {...{
          firstName,
          setFirstName,
          lastName,
          setLastName,
          username,
          setUsername,
          password,
          setPassword,
          password2,
          setPassword2,
          csrfToken,
          setCsrfToken,
          setUser,
        }} />
        )}
      </div>
    </>
  )
}