import { LoginOrRegister } from "./components/LoginOrRegister";
import { useAuth } from "./context/AuthContext";
import { getCsrfToken, logOut } from "./utils/authUtils";

function App() {
  const {
    user,
    csrfToken,
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
      <div className="button-card">
        {user ? (
          <>
            <p>First Name:  <code style={{color: 'coral'}}>{user.first_name}</code></p>
            <p>Last Name:  <code style={{color: 'coral'}}>{user.last_name}</code></p>
            <p>Username:  <code style={{color: 'coral'}}>{user.username}</code></p>
          </>
        ) : (
          <LoginOrRegister />
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
