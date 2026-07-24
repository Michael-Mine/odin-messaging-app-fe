import { useState } from "react";
import styles from "../styles/Chats.module.css";
import NewChat from "./NewChat";
import ChatItem from "./ChatItem";

function Chats({ chats, setCurrentChat }) {
  const [newChatForm, setNewChatForm] = useState(false);

  const openNewChatForm = () => {
    setNewChatForm(!newChatForm);
  };

  const openMessages = (chatCuid) => {
    const chatsIndex = chats.findIndex((chat) => chat.cuid == chatCuid);
    setCurrentChat(chats[chatsIndex]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Chats</h2>
      <button onClick={openNewChatForm}>New Chat</button>
      {newChatForm && <NewChat />}
      <div className={styles.list}>
        {chats.map((chat) => {
          return (
            <ChatItem chat={chat} openMessages={openMessages} key={chat.cuid} />
          );
        })}
      </div>
    </div>
  );
}

export default Chats;
