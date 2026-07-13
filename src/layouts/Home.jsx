import useChats from "../hooks/useChats";

function Home({ username }) {
  const { chats, error, loading } = useChats(username);
  console.log(error);

  console.log(chats);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  // states: chats, current chat, current profile
  //chats List, add button
  //chat messages, message input,
  //profile, edit button
  return <h2>Logged In with {username}</h2>;
}

export default Home;
