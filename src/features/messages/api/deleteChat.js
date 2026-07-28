function deleteChat({ jwt, username, chatCuid }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}chat`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      chatCuid,
    }),
  }).then((response) => response.json());
}

export default deleteChat;
