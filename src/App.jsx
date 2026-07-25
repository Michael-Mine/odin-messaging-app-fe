import { useState } from "react";
import Footer from "./layouts/Footer";
import Login from "./features/auth/Login";
import "./styles/button.css";
import "./styles/input.css";
import "./styles/checkbox.css";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("JWT");
  const username = localStorage.getItem("MMA");

  return (
    <>
      <Navbar />
      {(token || loggedIn) && username ? (
        <Home setLoggedIn={setLoggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <Footer />
    </>
  );
}

export default App;

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
