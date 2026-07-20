import { useState } from "react";
import styles from "../styles/WriteMessage.module.css";

function WriteMessage() {
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <textarea
        type="text"
        placeholder="Write a message"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        maxLength="1000"
        className={styles.input}
      />
      <button className={styles.button}>Send</button>
    </div>
  );
}

export default WriteMessage;
