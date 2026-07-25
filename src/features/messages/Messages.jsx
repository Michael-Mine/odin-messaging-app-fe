import MessageItem from "./MessageItem";
import formatDate from "../../utils/formatDate";
import WriteMessage from "./WriteMessage";
import styles from "./Messages.module.css";
import { useEffect, useRef } from "react";
import MessagesHeader from "./MessagesHeader";

function Messages({ chat, setSideCompOpen, getProfileUser, getGroupInfoChat }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [chat]);

  let isGroupChat = false;
  if (chat.subject) isGroupChat = true;

  return (
    <div className={styles.container}>
      <MessagesHeader
        chat={chat}
        isGroupChat={isGroupChat}
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
        getGroupInfoChat={getGroupInfoChat}
      />
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
