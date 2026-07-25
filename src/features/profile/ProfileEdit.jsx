import { useState } from "react";
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
    const apiUrl = import.meta.env.VITE_API_URL;
    const JWT = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("updating profile");
    setSubmitting(true);

    fetch(`${apiUrl}profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JWT}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        name: formData.name,
        bio: formData.bio,
      }),
    })
      .then((response) => response.json())
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
      <button onClick={onSubmit}>Submit</button>
      {submitting && <h3>Submitting...</h3>}
      {error && <h3>A network error was encountered</h3>}
      {response && <h3>{response.message || response[0].msg}</h3>}
    </div>
  );
}

export default ProfileEdit;
