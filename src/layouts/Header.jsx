import styles from "../styles/Header.module.css";

function Header({ setLoggedIn }) {
  const logout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("MMA");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className={styles.header}>
      <button>Profile</button>
      <h1>Mr Mine Messaging App</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Header;
