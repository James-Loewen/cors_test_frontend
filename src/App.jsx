import { AuthFormWrapper } from "./components/AuthFormWrapper";
import { useAuth } from "./context/AuthContext";
import { getCsrfToken, logOut } from "./utils/authUtils";

function App() {
  const {
    user,
    csrfToken,
    setCsrfToken,
    setUser,
  } = useAuth();

  const requestCsrfToken = async () => {
    const token = await getCsrfToken();
    setCsrfToken(token);
  }

  const handleLogOut = async () => {
    // const token = await getCsrfToken();
    // setCsrfToken(null);
    const token = csrfToken;

    try {
      await logOut(token);
      setUser(null);
    } catch (err) {
      console.error(err);
      setCsrfToken(err.message);
    }
  }

  return (
    <main>
      <h1>CORS Cookies test</h1>
      {user ? (
        <div className="user-info-card">
          <p>User ID:  <code>{user.id}</code></p>
          <p>First Name:  <code>{user.first_name}</code></p>
          <p>Last Name:  <code>{user.last_name}</code></p>
          <p>Username:  <code>{user.username}</code></p>
          <p>Date joined:  <code>{new Date(user.date_joined).toLocaleDateString()}</code></p>
          <button onClick={requestCsrfToken}>Request CSRF Token</button>
          <p>CSRF Token: <code style={{overflowWrap: 'break-word'}}>{csrfToken}</code></p>
        </div>
      ) : (
        <AuthFormWrapper />
      )}
      {user && (
        <button className="logout-btn" onClick={handleLogOut}>Log Out</button>
      )}
    </main>
  )
}

export default App
