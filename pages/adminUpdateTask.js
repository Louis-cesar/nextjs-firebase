import { useEffect, useState } from "react";
import styles from "./adminUpdate.module.css";
import Modal from "react-modal";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const customStyles = {
  overlay: {
    background: "transparent",
  },
};
const AdminUpdateTask = ({ userId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [task, setTask] = useState([]);
  const [date, setDate] = useState("");

  console.log("task", task);

  const submit = async (e) => {
    const res = await addDoc(collection(db, "Tasks"), {
      comments: comments,
      userRef: `users/${userId}`,
      date: date,
      done: false,
    });

    console.log(res, db);
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "Tasks"),
        where("userRef", "==", `users/${userId}`)
      );
      const tasksRef = await getDocs(q);
      const tasksSnap = tasksRef.docs.map((u) => u.data());
      setTask(tasksSnap);
    })();
  }, []);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)} className={styles.update}>
        Add
      </button>

      <Modal
        isOpen={modalIsOpen}
        className={styles.custom}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        arialHideApp={true}
      >
        <h3 className={styles.h3}>Task Employee </h3>
        <div className={styles.maintable}>
          {task?.map((u, i) => {
            return (
              <div key={i} className={styles.table}>
                <table className={styles.table1}>
                  <tr>
                    <td>{u.comments}</td>
                    <td>{u.date}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label>Comments</label>
          <textarea
            placeholder="Enter your Task here"
            value={comments}
            onChange={({ target }) => setComments(target?.value)}
          />
          <label className={styles.label}>Date of Birth:</label>
          <input
            type="Date"
            name="Date"
            placeholder="Enter Date"
            className={styles.name}
            value={date}
            onChange={({ target }) => setDate(target?.value)}
            required
          />
          <div className={styles.btn}>
            <button
              className={styles.btnClose}
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>

            <button type="submit" className={styles.btnsave}>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUpdateTask;
