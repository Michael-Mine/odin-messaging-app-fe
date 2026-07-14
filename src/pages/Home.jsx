import Chats from "../components/Chats";
import useChats from "../hooks/useChats";
import Header from "../layouts/Header";

const chats = [
  {
    cuid: 1,
    subject: "null",
    users: [
      {
        // id: 1,
        username: "m@m.net",
        name: "Mine",
        bio: "SWE12",
      },
    ],
    messages: [],
  },
  {
    cuid: 3,
    subject: null,
    users: [
      {
        // cuid: 1,
        username: "m@m.net",
        name: "Mine",
        bio: "SWE12",
      },
      {
        // cuid: 2,
        username: "m2@m.net",
        name: "Mine2",
        bio: null,
      },
    ],
    messages: [
      {
        cuid: 1,
        senderId: 1,
        content: "Test1",
        createdAt: "2026-07-12T17:48:37.168Z",
      },
      {
        cuid: 2,
        senderId: 1,
        content: "Test2",
        createdAt: "2026-07-12T18:48:37.168Z",
      },
      {
        cuid: 2,
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
  console.log(username);

  // const { chats, error, loading } = useChats(username);

  // console.log(chats);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>A network error was encountered</p>;

  // states: chats, current chat, current profile

  //chat messages, message input,
  //profile, edit button

  // apis - get profile. update profile,
  // create chat, create message

  // nav with profile left, logged in middle, logout right

  return (
    <>
      <Header setLoggedIn={setLoggedIn} />
      <Chats chats={chats} />
    </>
  );
}

export default Home;
