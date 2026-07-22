import { useState } from "react";
import AddMember from "./AddMember";
import styles from "../styles/GroupInfo.module.css";

function GroupInfo({ chat, setSideCompOpen, getProfileUser }) {
  const [addMemberForm, setAddMemberForm] = useState(false);

  const openAddMemberForm = () => {
    setAddMemberForm(!addMemberForm);
  };

  const handleProfileClick = (username) => {
    getProfileUser(username);
    setSideCompOpen("profile");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{chat.subject}</h2>
      <button onClick={openAddMemberForm}>Add Member</button>
      {addMemberForm && <AddMember />}

      <div className={styles.list}>
        {chat.users.map((user) => {
          return (
            <button onClick={() => handleProfileClick(user.username)}>
              {user.name}
            </button>
          );
        })}
      </div>
      <button onClick={() => setSideCompOpen(false)}>Close</button>
    </div>
  );
}

export default GroupInfo;
