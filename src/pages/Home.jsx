import { useState } from "react";
import useChats from "../hooks/useChats";
import Header from "../layouts/Header";
import Chats from "../components/Chats";
import Messages from "../components/Messages";
import Profile from "../components/Profile";
import GroupInfo from "../components/GroupInfo";
import styles from "../styles/Home.module.css";
import useProfile from "../hooks/useProfile";

function Home({ setLoggedIn }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [sideCompOpen, setSideCompOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [groupInfoChat, setGroupInfoChat] = useState(null);

  const username = localStorage.getItem("MMA");
  const { chats, error, loading } = useChats(username);
  console.log(chats);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>A network error was encountered</h2>;

  const getProfileUser = (username) => {
    if (!chats.length && !profileUser) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const JWT = localStorage.getItem("JWT");
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
        .then((response) => setProfileUser(response))
        .catch((error) => console.error(error));
    } else if (chats.length) {
      const user = chats
        .flatMap((obj) => obj.users)
        .find((user) => user.username === username);
      setProfileUser(user);
    }
  };

  const getGroupInfoChat = (chatSubject) => {
    const chat = chats.find((chat) => chat.subject === chatSubject);
    setGroupInfoChat(chat);
  };

  // apis - update profile,
  // create chat, create message
  // add leave group/chat

  return (
    <>
      <Header
        setSideCompOpen={setSideCompOpen}
        getProfileUser={getProfileUser}
        setLoggedIn={setLoggedIn}
      />
      <div className={styles.container}>
        <Chats chats={chats} setCurrentChat={setCurrentChat} />
        {currentChat && (
          <Messages
            chat={currentChat}
            setSideCompOpen={setSideCompOpen}
            getProfileUser={getProfileUser}
            getGroupInfoChat={getGroupInfoChat}
          />
        )}
        {sideCompOpen == "profile" && profileUser && (
          <Profile user={profileUser} setSideCompOpen={setSideCompOpen} />
        )}
        {sideCompOpen == "group" && groupInfoChat && (
          <GroupInfo
            chat={groupInfoChat}
            setSideCompOpen={setSideCompOpen}
            getProfileUser={getProfileUser}
          />
        )}
      </div>
    </>
  );
}

export default Home;
