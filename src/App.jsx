import { useAuth } from "./context/AuthContext";
import { getCSRFToken, logOut, loginURL } from "./utils/authUtils";

function App() {
  const {
    user,
    CSRFToken,
    setUser,
  } = useAuth();

  console.log('user according to <App />', user);

  const handleLogIn = async (e) => {
    window.location.href = loginURL;
  }

  const handleLogOut = async (e) => {
    if (CSRFToken) {
      await logOut(CSRFToken);
    } else {
      const token = await getCSRFToken();
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
        {CSRFToken && (
          <p>CSRF token: <span style={{color: 'coral'}}>{CSRFToken}</span></p>
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
