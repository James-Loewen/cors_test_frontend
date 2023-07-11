import { useState } from "react";
import { getCookie } from "./utils/cookieUtils";

function App() {
  const [user, setUser] = useState(null);
  const [CSRFToken, setCSRFToken] = useState(null);

  const handleLogIn = async (e) => {
    window.location.href = "https://pynoodler.pythonanywhere.com/accounts/login/";
    // window.location.href = "http://localhost:8000/accounts/login/"
  }

  const handleLogUser = async (e) => {
    // const res = await fetch('http://localhost:8000/get_user/', {
    const res = await fetch('https://pynoodler.pythonanywhere.com/get_user/', {
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);

    setUser(data.user);
  }

  const handleLogCookie = async (e) => {
    const res = await fetch("https://pynoodler.pythonanywhere.com/get_csrf/", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.token);

    setCSRFToken(data.token);
  }

  const handleLogOut = async (e) => {
    if (CSRFToken) {
      await fetch("https://pynoodler.pythonanywhere.com/accounts/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": CSRFToken,
        }
      });
      setUser(null);
      return;
    }

    const res = await fetch("https://pynoodler.pythonanywhere.com/get_csrf/", {
      credentials: "include",
    });
    const data = await res.json();
    const token = data.token;
    await fetch("https://pynoodler.pythonanywhere.com/accounts/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      }
    });
    setUser(null);
    return;
  }

  return (
    <>
      <h1>CORS Cookies test</h1>
      <div className="button-card">
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={handleLogUser}>Log current user</button>
        {user && (
          <>
            <p>Current user: <span style={{color: 'coral'}}>{user}</span></p>
            <button onClick={() => setUser(null)}>clear</button>
          </>
        )}
        <button onClick={handleLogCookie}>Get CSRF token</button>
        {user && (
          <>
            <p>CSRF token: <span style={{color: 'coral'}}>{CSRFToken}</span></p>
            <button onClick={() => setCSRFToken(null)}>clear</button>
          </>
        )}
      </div>
      <hr/>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  )
}

export default App
