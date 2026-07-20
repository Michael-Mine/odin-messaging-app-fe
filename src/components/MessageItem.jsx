import styles from "../styles/MessageItem.module.css";
import formatDate from "../utils/formatDate";

function MessageItem({ message, isGroupChat }) {
  const username = localStorage.getItem("MMA");
  const date = formatDate(message.createdAt);

  //change to username check
  const containerStyles =
    message.senderId == 1 ? styles.userContainer : styles.otherContainer;

  return (
    <div className={containerStyles}>
      <div className={styles.name}>
        {isGroupChat && message.senderId !== 1 && message.senderId}
      </div>
      {message.content}
      <span className={styles.time}>
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

export default MessageItem;
