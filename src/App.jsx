import { useState } from "react";
import Footer from "./layouts/Footer";
import Login from "./components/Login";
import "./styles/button.css";
import "./styles/input.css";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const token = localStorage.getItem("JWT");

  const logout = () => {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <h1>Mr Mine Messaging App </h1>
      {(token || loggedIn) && username ? (
        <Home username={username} />
      ) : (
        <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
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
