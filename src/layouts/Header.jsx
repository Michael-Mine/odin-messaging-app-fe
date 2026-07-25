import reloadPage from "../utils/reloadPage";
import styles from "./Header.module.css";

function Header({ setSideCompOpen, getProfileUser, setLoggedIn }) {
  const username = localStorage.getItem("MMA");

  const handleClick = () => {
    getProfileUser(username);
    setSideCompOpen("profile");
  };

  const logout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("MMA");
    setLoggedIn(false);
    reloadPage();
  };

  return (
    <div className={styles.header}>
      <button onClick={handleClick}>My Profile</button>
      <h1>Mr Mine Messaging App</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Header;
