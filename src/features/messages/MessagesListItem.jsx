import styles from "./MessagesListItem.module.css";
import formatDate from "../../utils/formatDate";

function MessageListItem({ message, isGroupChat }) {
  const username = localStorage.getItem("MMA");
  const date = formatDate(message.createdAt);

  const containerStyles =
    message.sender.username === username
      ? styles.userContainer
      : styles.otherContainer;

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

export default MessageListItem;
