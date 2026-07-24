import { useState } from "react";

function AddMember({ chatCuid }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const JWT = localStorage.getItem("JWT");
    const username = localStorage.getItem("MMA");
    console.log("adding member chat");
    setSubmitting(true);

    fetch(`${apiUrl}chat`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JWT}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        username2: input,
        chatCuid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "New member added") {
          window.location.reload();
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
          // data-testid="name-input"
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
