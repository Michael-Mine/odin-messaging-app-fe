import { useEffect, useState } from "react";

const useChats = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const JWT = localStorage.getItem("JWT");

  useEffect(() => {
    console.log("fetching chats");
    fetch(`${apiUrl}user-chats`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setChats([...response]))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [apiUrl, JWT]);

  return { chats, error, loading };
};

export default useChats;
