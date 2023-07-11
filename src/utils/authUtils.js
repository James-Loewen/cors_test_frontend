// const BASE_URL = new URL("http://localhost:5173/")
const BASE_URL = new URL("https://pynoodler.pythonanywhere.com/");

export const loginURL = new URL("accounts/login/", BASE_URL);

export const getCSRFToken = async () => {
  const url = new URL("get_csrf/", BASE_URL);
  const res = await fetch(url);
  const data = await res.json();
  return data.token;
}

export const logOut = async (CSRFToken) => {
  const url = new URL("accounts/logout/", BASE_URL);
  await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": CSRFToken,
    },
  });
}