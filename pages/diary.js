import styles from "./diary.module.css";
import SidebarLayout from "../comps/sidebarLayout";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import DiarySwitch from "./diarySwitch";

const Diary = ({ userId }) => {
  const [task, setTask] = useState([]);

  const { user } = useAuth();

  console.log("task", task);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "Tasks"),
        where("userRef", "==", `users/${user?.uid}`)
      );
      const tasksRef = await getDocs(q);
      const tasksSnap = tasksRef.docs.map((u) => {
        const obj = u.data();
        obj.id = u.id;
        return obj;
      });
      setTask(tasksSnap);
    })();
  }, []);

  const handleSwitch = async (id, value) => {
    await updateDoc(doc(db, "Tasks", id), {
      isDone: value,
    });
  };

  return (
    <SidebarLayout>
      {task?.map((u, i) => {
        return (
          <div className={styles.listItem} key={i}>
            <table className={styles.table}>
              <tr className={styles.tr1}>
                <th>Task</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>{u.comments}</td>
                <td>{u.date}</td>
                <td>
                  <DiarySwitch
                    id={u.id}
                    isDone={u.isDone}
                    handleSwitch={handleSwitch}
                  />
                </td>
              </tr>
            </table>
          </div>
        );
      })}
    </SidebarLayout>
  );
};

export default Diary;
