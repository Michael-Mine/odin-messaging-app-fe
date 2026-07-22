import { useState } from "react";

function AddMember() {
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
      <button>Submit</button>
    </div>
  );
}

export default AddMember;
