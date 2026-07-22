import { useState } from "react";
import styles from "../styles/Profile.module.css";
import ProfileEdit from "./ProfileEdit";

function Profile({ user, setSideCompOpen, setProfileUser }) {
  const [profileEditForm, setProfileEditForm] = useState(false);
  const username = localStorage.getItem("MMA");

  const openProfileEditForm = () => {
    setProfileEditForm(!profileEditForm);
  };

  return (
    <div className={styles.container}>
      <h2>{user.name} Profile</h2>
      <h3>{user.username}</h3>
      <p>{user.bio && user.bio}</p>

      <button onClick={() => setSideCompOpen(false)}>Close</button>
      {username == user.username && (
        <button onClick={openProfileEditForm}>Edit</button>
      )}
      {profileEditForm && (
        <ProfileEdit user={user} setProfileUser={setProfileUser} />
      )}
    </div>
  );
}

export default Profile;
