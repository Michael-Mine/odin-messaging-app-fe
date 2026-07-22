import { useState } from "react";
import useChats from "../hooks/useChats";
import Header from "../layouts/Header";
import Chats from "../components/Chats";
import Messages from "../components/Messages";
import Profile from "../components/Profile";
import styles from "../styles/Home.module.css";
import GroupInfo from "../components/GroupInfo";

// const chats = [
//   {
//     cuid: 1,
//     subject: "Yids chat",
//     users: [
//       {
//         // id: 1,
//         username: "m@m.net",
//         name: "Mine",
//         bio: "The first if statement will now execute and return a <div> with the text “Loading…” This is often the case when you are fetching from an API, since it might take some time to actually retrieve the data, it is good practice to show an indicator for that. If none of those checks passed, then we have t",
//       },
//       {
//         // cuid: 2,
//         username: "m3@m.net",
//         name: "Mine3",
//         bio: null,
//       },
//     ],
//     messages: [
//       {
//         cuid: 4,
//         senderId: 1,
//         content:
//           "In our <List /> component, we have two if statements acting as a guard that immediately returns an element based on the condition.",
//         createdAt: "2026-07-12T17:48:37.168Z",
//       },
//       {
//         cuid: 5,
//         senderId: 1,
//         content:
//           "One is to check if the property animals exists, and the other is to check if the length of the list is greater than 0. In this case, our list is empty, so the second if statement executes, which immediately returns the <div> element that contains the text “There are no animals in the list”.",
//         createdAt: "2026-07-13T18:48:37.168Z",
//       },
//       {
//         cuid: 6,
//         senderId: 2,
//         content: "If we remove the animals property:",
//         createdAt: "2026-07-14T19:48:37.168Z",
//       },
//     ],
//   },
//   {
//     cuid: 3,
//     subject: null,
//     users: [
//       {
//         // cuid: 1,
//         username: "m@m.net",
//         name: "Mine",
//         bio: "SWE12",
//       },
//       {
//         // cuid: 2,
//         username: "m2@m.net",
//         name: "Mine2",
//         bio: null,
//       },
//     ],
//     messages: [
//       {
//         cuid: 1,
//         senderId: 1,
//         content:
//           "The first if statement will now execute and return a <div> with the text “Loading…” This is often the case when you are fetching from an API, since it might take some time to actually retrieve the data, it is good practice to show an indicator for that.",
//         createdAt: "2026-07-12T17:48:37.168Z",
//       },
//       {
//         cuid: 2,
//         senderId: 1,
//         content:
//           "If none of those checks passed, then we have the data we need to render the list successfully. Try it out by adding items to the animals list and adding the property back.",
//         createdAt: "2026-07-13T18:48:37.168Z",
//       },
//       {
//         cuid: 3,
//         senderId: 2,
//         content:
//           "You can, of course, also accomplish this with just the ternary and && operators.",
//         createdAt: "2026-07-14T19:48:37.168Z",
//       },
//       {
//         cuid: 4,
//         senderId: 1,
//         content:
//           "The first if statement will now execute and return a <div> with the text “Loading…” This is often the case when you are fetching from an API, since it might take some time to actually retrieve the data, it is good practice to show an indicator for that.",
//         createdAt: "2026-07-12T17:48:37.168Z",
//       },
//       {
//         cuid: 5,
//         senderId: 1,
//         content:
//           "If none of those checks passed, then we have the data we need to render the list successfully. Try it out by adding items to the animals list and adding the property back.",
//         createdAt: "2026-07-13T18:48:37.168Z",
//       },
//       {
//         cuid: 6,
//         senderId: 2,
//         content:
//           "You can, of course, also accomplish this with just the ternary and && operators.",
//         createdAt: "2026-07-14T19:48:37.168Z",
//       },
//     ],
//   },
// ];

// remove ids
// add name to messages
// get profiles from chats?
// how to deal with users leaving chats?

function Home({ setLoggedIn }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [sideCompOpen, setSideCompOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [groupInfoChat, setGroupInfoChat] = useState(null);

  const getProfileUser = (username) => {
    if (!chats.length) {
      console.log("get profile");
    } else {
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

  const username = localStorage.getItem("MMA");
  const { chats, error, loading } = useChats(username);
  console.log(chats);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>A network error was encountered</h2>;

  // apis - get profile. update profile,
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
