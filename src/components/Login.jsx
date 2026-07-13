import { useState } from "react";
import SignUp from "./SignUp";

function Login({ setLoggedIn, setUsername }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}login`;

  const openSignUpForm = () => {
    setSignUpForm(!signUpForm);
  };

  const sendLogin = () => {
    console.log("logging in");
    setLoggingIn(true);

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: inputEmail, password: inputPass }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => {
        setUsername(inputEmail);
        setLoggingIn(false);
      });
  };

  if (loggingIn) return <p>Logging In...</p>;

  if (response && response.token) {
    localStorage.setItem("JWT", response.token);
    setLoggedIn(true);
  }

  return (
    <div>
      <h4>Login to access</h4>
      <div className="input-container">
        <label htmlFor="username">Email:</label>
        <input
          className="input-field"
          id="username"
          data-testid="username-input"
          type="text"
          value={inputEmail}
          onChange={(event) => setInputEmail(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="input-field"
          id="password"
          data-testid="password-input"
          type="text"
          value={inputPass}
          onChange={(event) => setInputPass(event.target.value)}
        />
      </div>
      <button onClick={sendLogin}>Login</button>
      <button onClick={openSignUpForm}>or Sign Up</button>
      {error && <p className="characters">A network error was encountered</p>}
      {response && <p className="characters">{response.message}</p>}
      {signUpForm && <SignUp />}
    </div>
  );
}

export default Login;
