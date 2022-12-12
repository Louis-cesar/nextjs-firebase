import styles from "./diary.module.css";
import SidebarLayout from "../comps/sidebarLayout";

import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const Diary = ({ userId }) => {
  const [task, setTask] = useState([]);

  console.log("task", task);

  useEffect(() => {
    (async () => {
      const userRef = await getDocs(collection(db, userId));
      const usersSnap = userRef.docs.map((u) => u.data());
      setTask(usersSnap);
    })();
  }, []);
  return (
    <SidebarLayout>
      {task?.map((u, i) => {
        return (
          <div className={styles.listItem} key={i}>
            <div className={styles.header}>{u.task}</div>
          </div>
        );
      })}
      <div className={styles.header}>hello</div>
    </SidebarLayout>
  );
};

export default Diary;
