function getHeading(chat, username, isGroupChat) {
  if (isGroupChat) return chat.subject;

  if (chat.users.length == 1) {
    return "No other user in chat";
  }

  if (chat.users[0].username !== username) {
    return chat.users[0].name;
  }
  return chat.users[1].name;
}

export default getHeading;
