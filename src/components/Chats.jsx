import { useState } from "react";
import styles from "../styles/Chats.module.css";
import NewChat from "./NewChat";

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
            <ChatItem
              chatItem={chat}
              openMessages={openMessages}
              key={chat.cuid}
            />
          );
        })}
      </div>
    </div>
  );
}

function ChatItem({ chatItem, openMessages }) {
  const username = localStorage.getItem("MMA");

  let buttonName;

  if (chatItem.subject) {
    buttonName = chatItem.subject;
  } else if (chatItem.users[0].username !== username) {
    buttonName = chatItem.users[0].name;
  } else {
    buttonName = chatItem.users[1].name;
  }

  return (
    <button onClick={() => openMessages(chatItem.cuid)}>{buttonName}</button>
  );
}

export default Chats;
