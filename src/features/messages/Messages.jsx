import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import WriteMessage from "./WriteMessage";
import styles from "./Messages.module.css";

function Messages({ chat, setSideCompOpen, getProfileUser, getGroupInfoChat }) {
  const isGroupChat = Boolean(chat.subject);

  return (
    <div className={styles.container}>
      <MessagesHeader
        chat={chat}
        isGroupChat={isGroupChat}
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
        getGroupInfoChat={getGroupInfoChat}
      />
      <MessagesList messages={chat.messages} isGroupChat={isGroupChat} />
      {chat.users.length > 1 ? (
        <WriteMessage chatCuid={chat.cuid} />
      ) : (
        <h4>No other user in chat</h4>
      )}
    </div>
  );
}

export default Messages;
