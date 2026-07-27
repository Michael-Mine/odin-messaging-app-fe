import { useEffect, useRef } from "react";
import formatDate from "../../utils/formatDate";
import MessagesListItem from "./MessagesListItem";
import shouldShowDivider from "./shouldShowDivider";
import styles from "./MessagesList.module.css";

function MessagesList({ messages, isGroupChat }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={containerRef} className={styles.list}>
      {messages.map((message, index) => {
        return (
          <div className={styles.dividerContainer} key={message.cuid}>
            {shouldShowDivider(messages, index) && (
              <div className={styles.divider}>
                {formatDate(message.createdAt).toDateString()}
              </div>
            )}
            <MessagesListItem message={message} isGroupChat={isGroupChat} />
          </div>
        );
      })}
    </div>
  );
}

export default MessagesList;
