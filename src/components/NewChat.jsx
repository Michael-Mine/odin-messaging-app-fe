import { useState } from "react";

function NewChat() {
  const [input, setInput] = useState("");

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
      <button>Start New Chat</button>
    </div>
  );
}

export default NewChat;
