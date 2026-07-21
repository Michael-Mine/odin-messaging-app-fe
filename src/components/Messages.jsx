import MessageItem from "./MessageItem";
import formatDate from "../utils/formatDate";
import WriteMessage from "./WriteMessage";
import styles from "../styles/Messages.module.css";
import { useEffect, useRef } from "react";

function Messages({ chat }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);

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
    <div ref={containerRef} className={styles.container}>
      <div className={styles.heading}>
        <button>Profile</button>
        <h2 className={styles.headingName}>{heading}</h2>
      </div>
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
      {/* <div className={styles.anchor}></div> */}
    </div>
  );
}

export default Messages;
