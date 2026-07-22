import MessageItem from "./MessageItem";
import formatDate from "../utils/formatDate";
import WriteMessage from "./WriteMessage";
import styles from "../styles/Messages.module.css";
import { useEffect, useRef } from "react";

function Messages({ chat, setProfileCompOpen, getProfileUser }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [chat]);

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

  const handleClick = () => {
    if (chat.users[0].username !== username) {
      getProfileUser(chat.users[0].username);
    } else {
      getProfileUser(chat.users[1].username);
    }
    setProfileCompOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <button onClick={handleClick}>Profile</button>
        <h2 className={styles.headingName}>{heading}</h2>
      </div>
      <div ref={containerRef} className={styles.list}>
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
