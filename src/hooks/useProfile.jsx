import { useEffect, useState } from "react";

const useProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const JWT = localStorage.getItem("JWT");

  useEffect(() => {
    console.log("fetching profile");
    fetch(`${apiUrl}profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setProfile([...response]))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [apiUrl, JWT, username]);

  return { profile, error, loading };
};

export default useProfile;
