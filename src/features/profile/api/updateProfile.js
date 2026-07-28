function updateProfile({ jwt, username, name, bio }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      name,
      bio,
    }),
  }).then((response) => response.json());
}

export default updateProfile;
