const BASE_URL = new URL("http://localhost:8000/");
// const BASE_URL = new URL("https://pynoodler.pythonanywhere.com/");

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

  if (res.status === 200) {
    const data = await res.json();
    return data;
  }

  throw new Error(`status ${res.status} ${res.statusText ?? ''}`);
}

export const registerUser = async (csrfToken, user) => {
  const url = new URL('register/', BASE_URL);
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(user),
  });

  if (res.status === 201) {
    const data = await res.json();
    console.log(data);
    return data;
  }

  throw new Error(`status: ${res.status} ${res.statusText ?? ''}`);
}

export const logIn = async (csrfToken, username, password) => {
  const url = new URL('my_login/', BASE_URL);
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({ username, password }),
  });

  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    return data;
  }

  throw new Error(`status: ${res.status} ${res.statusText ?? ''}`);
}

export const logOut = async (csrfToken) => {
  const url = new URL("my_logout/", BASE_URL);
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  });

  if (res.status === 403) {
    throw new Error("CSRF Failed.");
  }
}