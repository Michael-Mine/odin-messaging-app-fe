import styles from "../styles/Chats.module.css";

function Chats({ chats }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}> */}
      <h2>Chats</h2>
      <button>New Chat</button>
      {/* </div> */}
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
