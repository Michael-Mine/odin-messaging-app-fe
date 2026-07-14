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

  return (
    <>
      <Navbar />
      {(token || loggedIn) && username ? (
        <Home setLoggedIn={setLoggedIn} username={username} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <Footer />
    </>
  );
}

export default App;
