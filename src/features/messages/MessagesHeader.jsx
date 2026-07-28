import { useState } from "react";
import getHeading from "./getHeading";
import deleteChat from "./api/deleteChat";
import styles from "./MessagesHeader.module.css";

function MessagesHeader({
  chat,
  isGroupChat,
  setSideCompOpen,
  getProfileUser,
  getGroupInfoChat,
}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const username = localStorage.getItem("MMA");

  // let heading;

  // if (isGroupChat) {
  //   heading = chat.subject;
  // } else if (chat.users.length == 1) {
  //   heading = "No other user in chat";
  // } else if (chat.users[0].username !== username) {
  //   heading = chat.users[0].name;
  // } else {
  //   heading = chat.users[1].name;
  // }

  const heading = getHeading(chat, username, isGroupChat);

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

  const leaveChat = () => {
    const jwt = localStorage.getItem("JWT");
    console.log("leaving chat");
    setSubmitting(true);

    deleteChat({
      jwt,
      username,
      chatCuid: chat.cuid,
    })
      .then((response) => {
        setResponse({ ...response });
        if (response.message === "User left chat") {
          window.location.reload();
        }
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className={styles.heading}>
        {isGroupChat ? (
          <>
            <button onClick={handleGroupInfoClick}>Group Info</button>
            <h2 className={styles.headingName}>{heading}</h2>
            <button onClick={leaveChat}>Leave Group</button>
          </>
        ) : (
          <>
            {chat.users.length > 1 && (
              <button onClick={handleProfileClick}>Profile</button>
            )}
            <h2 className={styles.headingName}>{heading}</h2>
            <button onClick={leaveChat}>Leave Chat</button>
          </>
        )}
      </div>
      {submitting && <h3>Submitting...</h3>}
      {error && <h3>A network error was encountered</h3>}
      {response && <h3>{response.message || response[0].msg}</h3>}
    </>
  );
}

export default MessagesHeader;
