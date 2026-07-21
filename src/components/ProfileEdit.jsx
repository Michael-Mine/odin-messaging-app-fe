import { useState } from "react";
import styles from "../styles/ProfileEdit.module.css";

function ProfileEdit({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <div className="input-container">
        <input
          className="input-field"
          id="name"
          name="name"
          // data-testid="name-input"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="about">About:</label>
      <div className="input-container">
        <textarea
          id="about"
          name="bio"
          type="text"
          placeholder="Write a message"
          value={formData.bio}
          onChange={handleChange}
          maxLength="300"
          className={styles.bioInput}
        />
      </div>
      <button>Submit</button>
    </div>
  );
}

export default ProfileEdit;
