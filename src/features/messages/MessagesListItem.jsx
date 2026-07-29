import formatDate from "../../utils/formatDate";
import styles from "./MessagesListItem.module.css";

function MessageListItem({ message, isGroupChat }) {
  const username = localStorage.getItem("MMA");
  const date = formatDate(message.createdAt);

  const containerStyles =
    message.sender.username === username
      ? styles.userContainer
      : styles.otherContainer;

  return (
    <div className={containerStyles} data-testid="message-container">
      <div className={styles.name}>
        {isGroupChat &&
          message.sender.username !== username &&
          message.sender.name}
      </div>
      <div>{message.content}</div>
      <span className={styles.time}>
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

export default MessageListItem;
