import MessageItem from "./MessageItem";
import styles from "../styles/Messages.module.css";
import formatDate from "../utils/formatDate";
import WriteMessage from "./WriteMessage";

function Messages({ chat }) {
  const username = localStorage.getItem("MMA");
  let isGroupChat = false;
  let heading;

  if (chat.subject) {
    isGroupChat = true;
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
        {chat.messages.map((message, idx, arr) => {
          const currentDate = formatDate(message.createdAt);

          if (idx < 1) {
            return (
              <>
                <div class={styles.divider}>{currentDate.toDateString()}</div>
                <MessageItem
                  message={message}
                  isGroupChat={isGroupChat}
                  key={message.cuid}
                />
              </>
            );
          } else {
            const prev = arr[idx - 1];
            const prevDate = formatDate(prev.createdAt);
            if (
              prevDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
            ) {
              return (
                <>
                  <div class={styles.divider}>{currentDate.toDateString()}</div>
                  <MessageItem
                    message={message}
                    isGroupChat={isGroupChat}
                    key={message.cuid}
                  />
                </>
              );
            } else {
              return (
                <MessageItem
                  message={message}
                  isGroupChat={isGroupChat}
                  key={message.cuid}
                />
              );
            }
          }
        })}
      </div>
      <WriteMessage />
    </div>
  );
}

export default Messages;
