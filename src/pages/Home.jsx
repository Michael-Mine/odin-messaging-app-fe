import useChats from "../hooks/useChats";
import Header from "../layouts/Header";
import Navbar from "../layouts/Navbar";

const chats = [
  {
    subject: null,
    users: [
      {
        id: 1,
        username: "m@m.net",
        name: "Mine",
        bio: "SWE12",
      },
    ],
    messages: [],
  },
  {
    id: 3,
    subject: null,
    users: [
      {
        id: 1,
        username: "m@m.net",
        name: "Mine",
        bio: "SWE12",
      },
      {
        id: 1,
        username: "m2@m.net",
        name: "Mine2",
        bio: null,
      },
    ],
    messages: [
      {
        id: 1,
        senderId: 1,
        content: "Test1",
        createdAt: "2026-07-12T17:48:37.168Z",
      },
      {
        id: 2,
        senderId: 1,
        content: "Test2",
        createdAt: "2026-07-12T18:48:37.168Z",
      },
      {
        id: 2,
        senderId: 2,
        content: "Test3",
        createdAt: "2026-07-12T19:48:37.168Z",
      },
    ],
  },
];

// remove ids
// add name to messages
// get profiles from chats?
// how to deal with users leaving chats?

function Home({ username, setLoggedIn }) {
  const { chats, error, loading } = useChats(username);

  console.log(chats);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  // states: chats, current chat, current profile
  //chats List, add button
  //chat messages, message input,
  //profile, edit button

  // apis - get profile. update profile,
  // create chat, create message

  // nav with profile left, logged in middle, logout right

  return (
    <>
      <Header setLoggedIn={setLoggedIn} />
    </>
  );
}

export default Home;
