import { useState } from "react";
import styles from "../styles/Chats.module.css";
import NewChat from "./NewChat";

function Chats({ chats }) {
  const [newChatForm, setNewChatForm] = useState(false);

  const openNewChatForm = () => {
    setNewChatForm(!newChatForm);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Chats</h2>
      <button onClick={openNewChatForm}>New Chat</button>
      {newChatForm && <NewChat />}
      <div className={styles.list}>
        {chats.map((chat) => {
          return <ChatItem chat={chat} key={chat.cuid} />;
        })}
      </div>
    </div>
  );
}

function ChatItem({ chat }) {
  const username = localStorage.getItem("MMA");

  let buttonName;

  if (chat.subject) {
    buttonName = chat.subject;
  } else if (chat.users[0].username !== username) {
    buttonName = chat.users[0].name;
  } else {
    buttonName = chat.users[1].name;
  }

  return <button>{buttonName}</button>;
}

export default Chats;
