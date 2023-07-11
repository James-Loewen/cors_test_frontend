import { getCookie } from "./utils/cookieUtils";

function App() {
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
  }

  const handleLogCookie = async (e) => {
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);
  }

  return (
    <>
      <h1>CORS Cookies test</h1>
      <div className="button-card">
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={handleLogUser}>Log current user</button>
        <button onClick={handleLogCookie}>Log CSRF token</button>
      </div>
    </>
  )
}

export default App
