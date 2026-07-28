function createMessage({ jwt, username, chatCuid, content }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      chatCuid,
      content,
    }),
  }).then((response) => response.json());
}

export default createMessage;
