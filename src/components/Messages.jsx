import styles from "../styles/Messages.module.css";

function Messages({ chat }) {
  const username = localStorage.getItem("MMA");

  let heading;

  if (chat.subject) {
    heading = chat.subject;
  } else if (chat.users[0].username !== username) {
    heading = chat.users[0].name;
  } else {
    heading = chat.users[1].name;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.list}>
        {chat.messages.map((message) => {
          return <MessageItem message={message} key={message.cuid} />;
        })}
      </div>
      {/* Write Message */}
    </div>
  );
}

function MessageItem({ message }) {
  return <div>{message.content}</div>;
}

export default Messages;
