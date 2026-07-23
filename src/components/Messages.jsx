import MessageItem from "./MessageItem";
import formatDate from "../utils/formatDate";
import WriteMessage from "./WriteMessage";
import styles from "../styles/Messages.module.css";
import { useEffect, useRef } from "react";

function Messages({ chat, setSideCompOpen, getProfileUser, getGroupInfoChat }) {
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
  } else if (chat.users.length == 1) {
    heading = "No other user in chat";
  } else if (chat.users[0].username !== username) {
    heading = chat.users[0].name;
  } else {
    heading = chat.users[1].name;
  }

  const handleGroupInfoClick = () => {
    getGroupInfoChat(chat.subject);
    setSideCompOpen("group");
  };

  const handleProfileClick = () => {
    if (chat.users[0].username !== username) {
      getProfileUser(chat.users[0].username);
    } else {
      getProfileUser(chat.users[1].username);
    }
    setSideCompOpen("profile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {isGroupChat ? (
          <>
            <button onClick={handleGroupInfoClick}>Group Info</button>
            <h2 className={styles.headingName}>{heading}</h2>
            <button>Leave Group</button>
          </>
        ) : (
          <>
            {chat.users.length > 1 && (
              <button onClick={handleProfileClick}>Profile</button>
            )}
            <h2 className={styles.headingName}>{heading}</h2>
            <button>Leave Chat</button>
          </>
        )}
      </div>
      <div ref={containerRef} className={styles.list}>
        {chat.messages.map((message, idx, arr) => {
          const currentDate = formatDate(message.createdAt);

          if (idx < 1) {
            return (
              <>
                <div className={styles.divider}>
                  {currentDate.toDateString()}
                </div>
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
                  <div className={styles.divider}>
                    {currentDate.toDateString()}
                  </div>
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
      {chat.users.length > 1 ? (
        <WriteMessage chatCuid={chat.cuid} />
      ) : (
        <h4>No other user in chat</h4>
      )}
    </div>
  );
}

export default Messages;
