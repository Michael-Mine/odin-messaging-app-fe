function createChat({ jwt, username, username2, subject }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      username2,
      subject,
    }),
  }).then((response) => response.json());
}

export default createChat;
