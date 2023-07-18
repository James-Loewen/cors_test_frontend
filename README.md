# Cross-Origin Resource Sharing & Session Cookie Front-End

This project is the front-end part of my CORS Project. It is a login/registration simulator built with React + Vanilla JavaScript, styled with Vanilla CSS, and bundled with Vite. It uses the JavaScript [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make requests to the back-end part of the project which is served from an unrelated domain. These requests are authenticated via a session cookie which is passed with each request using the `credentials: 'include'` option.

**Table of Contents**

- [Installation and Setup](#installation-and-setup)
- [Functionality](#functionality)
- **[CSRF Protection](#cross-site-request-forgery-csrf-protection)**
- [Back-End Repository](#back-end-repository)
- [License](#license)

<a name="installation-and-setup"></a>

## Installation and Setup

***It is not necessary to host this project locally.*** It is hosted publicly on [GitHub Pages](https://James-Loewen.github.io/cors_test_frontend/).

Clone the repository:

```bash
git clone https://github.com/James-Loewen/cors_test_frontend.git
```

Install the project dependencies:

```bash
cd cors_test_frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be accessible at `http://localhost:5173/`

**Note:** if you are running both the front and back-end parts of this project locally, you will need to change the `BASE_URL` constant defined in `src/utils/authUtils.js`.

```diff
- const BASE_URL = new URL("https://pynoodler.pythonanywhere.com/");
+ const BASE_URL = new URL("http://localhost:5173/");
```

<a name="functionality"></a>

## Functionality

***Disclaimer:*** This project was created in an effort to learn more about Cross-Site Request Forgery (CSRF) attacks and prevention methods. *Please do not use any genuine personal information as I cannot guarantee its safety.* There are no password requirements, feel to use passwords like `password` or `1234`.

The website provides the following functionality:

- **User Registration:** Users can register a new account by providing:
    - First Name
    - Last Name
    - Username
    - Password
- **User Login:** Registered users can log in using their username and password.
- **Account Details Page:** Upon successful login, users are brought to a screen that simply displays the information they provided in order to register along with a datetime marking when they registered.

*All accounts and all user data are automatically deleted every 24 hours.*

<a name="cross-site-request-forgery-csrf-protection"></a>

## **Cross-Site Request Forgery (CSRF) Protection**

<a name="back-end-repository"></a>

## Back-End Repository

For the back-end aspect of this project, please refer to the [back-end repository](#).

<a name="license"></a>

## License

This project is licensed under the [MIT License](LICENSE).
