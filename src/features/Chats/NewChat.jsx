import { useState } from "react";
import createChat from "./api/createChat";
import reloadPage from "../../utils/reloadPage";
import styles from "./NewChat.module.css";

function NewChat() {
  const [usernameInput, setUsernameInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const jwt = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("creating chat");
    setSubmitting(true);

    createChat({
      jwt,
      username,
      username2: usernameInput,
      subject: subjectInput,
    })
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "New chat created") {
          reloadPage();
        }
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <label htmlFor="name">Enter a Username:</label>
      <div className="input-container">
        <input
          className="input-field"
          id="name"
          name="name"
          // data-testid="name-input"
          type="text"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
        />
      </div>
      <div className={styles.checkbox}>
        <label>Group Chat? </label>
        <div class="checkbox-wrapper-12">
          <div class="cbx">
            <input
              checked=""
              type="checkbox"
              id="cbx-12"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label for="cbx-12"></label>
            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo-12">
                <feGaussianBlur
                  result="blur"
                  stdDeviation="4"
                  in="SourceGraphic"
                ></feGaussianBlur>
                <feColorMatrix
                  result="goo-12"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  mode="matrix"
                  in="blur"
                ></feColorMatrix>
                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      {isChecked && (
        <>
          <label htmlFor="group-subject">Group Subject (required):</label>
          <div className="input-container">
            <input
              className="input-field"
              id="group-subject"
              name="group-subject"
              // data-testid="name-input"
              type="text"
              value={subjectInput}
              onChange={(event) => setSubjectInput(event.target.value)}
            />
          </div>
        </>
      )}
      <button onClick={onSubmit}>Start New Chat</button>
      {submitting && <h3>Submitting...</h3>}
      {error && <h3>A network error was encountered</h3>}
      {response && <h3>{response.message || response[0].msg}</h3>}
    </div>
  );
}

export default NewChat;
