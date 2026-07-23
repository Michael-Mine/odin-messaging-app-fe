import { useState } from "react";
import styles from "../styles/WriteMessage.module.css";

function WriteMessage({ chatCuid }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const JWT = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("creating chat");
    setSubmitting(true);

    fetch(`${apiUrl}message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        chatCuid,
        content: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "New message created") {
          window.location.reload();
        }
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className={styles.container}>
        <textarea
          type="text"
          placeholder="Write a message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength="1000"
          className={styles.input}
        />
        <button className={styles.button} onClick={onSubmit}>
          Send
        </button>
      </div>
      <div>
        {submitting && <h3>Submitting...</h3>}
        {error && <h3>A network error was encountered</h3>}
        {response && <h3>{response.message || response[0].msg}</h3>}
      </div>
    </>
  );
}

export default WriteMessage;
