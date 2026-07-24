import styles from "../styles/MessagesHeader.module.css";

function MessagesHeader({
  chat,
  isGroupChat,
  setSideCompOpen,
  getProfileUser,
  getGroupInfoChat,
}) {
  const username = localStorage.getItem("MMA");

  let heading;

  if (isGroupChat) {
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

  const leaveChat = () => {};

  return (
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
  );
}

export default MessagesHeader;
