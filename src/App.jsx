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
    let token = csrfToken
    
    if (!csrfToken) {
      token = await getCsrfToken();
      setCsrfToken(token);
    }

    await logOut(token);
    setUser(null);
  }

  return (
    <>
      <h1>CORS Cookies test</h1>
      <div className="button-card">
        {user ? (
          <p>Current user: <code style={{color: 'coral'}}>{user}</code></p>
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
