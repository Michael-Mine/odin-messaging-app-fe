import { useState } from "react";
import updateChat from "./api/updateChat";
import reloadPage from "../../utils/reloadPage";

function AddMember({ chatCuid }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const jwt = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("adding member chat");
    setSubmitting(true);

    updateChat({
      jwt,
      username,
      username2: input,
      chatCuid,
    })
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "New member added") {
          reloadPage();
        }
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  };
  return (
    <div>
      <label htmlFor="name">Enter Username:</label>
      <div className="input-container">
        <input
          className="input-field"
          id="name"
          name="name"
          data-testid="name-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
      {submitting && <h3>Submitting...</h3>}
      {error && <h3>A network error was encountered</h3>}
      {response && <h3>{response.message || response[0].msg}</h3>}
    </div>
  );
}

export default AddMember;
