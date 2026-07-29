function updateChat({ jwt, username, username2, chatCuid }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}chat`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      username2,
      chatCuid,
    }),
  }).then((response) => response.json());
}

export default updateChat;
