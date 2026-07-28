import { useState } from "react";
import createMessage from "./api/createMessage";
import reloadPage from "../../utils/reloadPage";
import styles from "./WriteMessage.module.css";

function WriteMessage({ chatCuid }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const jwt = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("creating chat");
    setSubmitting(true);

    createMessage({
      jwt,
      username,
      chatCuid,
      content: input,
    })
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "New message created") {
          reloadPage();
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
          data-testid="write-message"
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
