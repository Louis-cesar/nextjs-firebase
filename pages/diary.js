import styles from "./diary.module.css";
import SidebarLayout from "../comps/sidebarLayout";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const Diary = ({ userId }) => {
  const [task, setTask] = useState([]);

  const { user } = useAuth();

  console.log("task", task);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "Tasks"),
        where("userRef", "==", `users/${user.uid}`)
      );
      const tasksRef = await getDocs(q);
      const tasksSnap = tasksRef.docs.map((u) => u.data());
      setTask(tasksSnap);
    })();
  }, []);
  return (
    <SidebarLayout>
      {task?.map((u, i) => {
        return (
          <div className={styles.listItem} key={i}>
            <div className={styles.header}>{u.comments}</div>
          </div>
        );
      })}
      <div className={styles.header}>hello</div>
    </SidebarLayout>
  );
};

export default Diary;
