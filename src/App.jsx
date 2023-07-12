import { LoginOrRegister } from "./components/LoginOrRegister";
import { useAuth } from "./context/AuthContext";
import { getCsrfToken, logOut } from "./utils/authUtils";

function App() {
  const {
    user,
    setCsrfToken,
    setUser,
  } = useAuth();

  const handleLogOut = async (e) => {
    const token = await getCsrfToken();
    setCsrfToken(null);

    await logOut(token);
    setUser(null);
  }

  return (
    <>
      <h1>CORS Cookies test</h1>
      {user ? (
        <div className="user-info-card">
          <p>First Name:  <code>{user.first_name}</code></p>
          <p>Last Name:  <code>{user.last_name}</code></p>
          <p>Username:  <code>{user.username}</code></p>
        </div>
      ) : (
        <LoginOrRegister />
      )}
      {user && (
        <button onClick={handleLogOut}>Log Out</button>
      )}
    </>
  )
}

export default App
