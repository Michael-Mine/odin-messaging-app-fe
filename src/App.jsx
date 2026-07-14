import { useState } from "react";
import Footer from "./layouts/Footer";
import Login from "./components/Login";
import "./styles/button.css";
import "./styles/input.css";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("JWT");
  const username = localStorage.getItem("MMA");

  const logout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("MMA");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      {(token || loggedIn) && username ? (
        <Home username={username} />
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
