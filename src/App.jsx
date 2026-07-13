import { useState } from "react";
import Footer from "./layouts/Footer";
import Login from "./components/Login";
import "./styles/button.css";
import "./styles/input.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("JWT");

  const logout = () => {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
  };

  return (
    <>
      <h1>Mr Mine Messaging App </h1>
      {token || loggedIn ? (
        <h2>Logged In!</h2>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <div>
        {(token || loggedIn) && (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
