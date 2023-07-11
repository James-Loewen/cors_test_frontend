import { useAuth } from "./context/AuthContext";
import { getCsrfToken, logOut, loginURL } from "./utils/authUtils";

function App() {
  const {
    user,
    csrfToken,
    setUser,
  } = useAuth();

  const handleLogIn = async (e) => {
    window.location.href = loginURL;
  }

  const handleLogOut = async (e) => {
    if (csrfToken) {
      await logOut(csrfToken);
    } else {
      const token = await getCsrfToken();
      await logOut(token);
    }
    setUser(null);
  }

  return (
    <>
      <h1>CORS Cookies test</h1>
      <div className="button-card">
        {user ? (
          <p>Current user: <span style={{color: 'coral'}}>{user}</span></p>
        ) : (
          <button onClick={handleLogIn}>Log In</button>
        )}
        {csrfToken && (
          <p>CSRF token: <span style={{color: 'coral'}}>{csrfToken}</span></p>
        )}
      </div>
      {user && (
        <>
          <hr/>
          <button onClick={handleLogOut}>Log Out</button>
        </>
      )}
    </>
  )
}

export default App
