// const BASE_URL = new URL("http://localhost:8000/")
const BASE_URL = new URL("https://pynoodler.pythonanywhere.com/");

export const loginURL = new URL("accounts/login/", BASE_URL);

export const getCsrfToken = async () => {
  const url = new URL("get_csrf/", BASE_URL);
  const res = await fetch(url, { credentials: "include" });
  const data = await res.json();
  return data.token;
}

export const getUser = async () => {
  const url = new URL("get_user/", BASE_URL);
  const res = await fetch(url, { credentials: "include" });
  const data = await res.json();
  return data;
}

export const logOut = async (csrfToken) => {
  const url = new URL("accounts/logout/", BASE_URL);
  await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  });
}