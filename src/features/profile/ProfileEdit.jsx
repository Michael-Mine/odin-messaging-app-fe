import { useState } from "react";
import updateProfile from "./api/updateProfile";
import styles from "./ProfileEdit.module.css";

function ProfileEdit({ user, setProfileUser }) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const jwt = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("updating profile");
    setSubmitting(true);

    updateProfile({
      jwt,
      username,
      name: formData.name,
      bio: formData.bio,
    })
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "User profile updated") {
          setProfileUser(response.updatedUser);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <div className="input-container">
        <input
          className="input-field"
          id="name"
          name="name"
          data-testid="name-input"
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
          value={formData.bio}
          onChange={handleChange}
          maxLength="300"
          className={styles.bioInput}
          data-testid="bio-input"
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
      {submitting && <h3>Submitting...</h3>}
      {error && <h3>A network error was encountered</h3>}
      {response && <h3>{response.message || response[0].msg}</h3>}
    </div>
  );
}

export default ProfileEdit;
