import styles from "../styles/Profile.module.css";

function Profile({ user }) {
  return (
    <div className={styles.container}>
      <h2>{user.name}</h2>
      <h3>{user.username}</h3>
      <p>{user.bio && user.bio}</p>
      <button>Close</button>
    </div>
  );
}

export default Profile;
