function ChatItem({ chat, openMessages }) {
  const username = localStorage.getItem("MMA");

  let buttonName;

  if (chat.subject) {
    buttonName = chat.subject;
  } else if (chat.users.length == 1) {
    buttonName = "Other user left";
  } else if (chat.users[0].username !== username) {
    buttonName = chat.users[0].name;
  } else {
    buttonName = chat.users[1].name;
  }

  return <button onClick={() => openMessages(chat.cuid)}>{buttonName}</button>;
}

export default ChatItem;
