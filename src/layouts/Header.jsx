import styles from "../styles/Header.module.css";

function Header({ setProfileCompOpen, getProfileUser, setLoggedIn }) {
  const username = localStorage.getItem("MMA");

  const logout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("MMA");
    setLoggedIn(false);
    window.location.reload();
  };

  const handleClick = () => {
    getProfileUser(username);
    setProfileCompOpen(true);
  };

  return (
    <div className={styles.header}>
      <button onClick={handleClick}>Profile</button>
      <h1>Mr Mine Messaging App</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Header;
