import { AuthFormWrapper } from "./components/AuthFormWrapper";
import { useAuth } from "./context/AuthContext";
import { logOut } from "./utils/authUtils";

function App() {
  const {
    user,
    csrfToken,
    setCsrfToken,
    setUser,
  } = useAuth();

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
      <h1>Cross-Site Resource Sharing Cookies & CSRF Token test</h1>
      {user ? (
        <div className="user-info-card">
          <div className="info-group">
            <p>User ID:</p>
            <code>{user.id}</code>
          </div>
          <div className="info-group">
            <p>First Name:</p>
            <code>{user.first_name}</code>
          </div>
          <div className="info-group">
            <p>Last Name:</p>
            <code>{user.last_name}</code>
          </div>
          <div className="info-group">
            <p>Username:</p>
            <code>{user.username}</code>
          </div>
          <div className="info-group">
            <p>Date joined:</p>
            <code>{new Date(user.date_joined).toLocaleDateString()}</code>
          </div>
          <div className="info-group">
            <p>CSRF Token:</p>
            <code>{csrfToken}</code>
          </div>
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
