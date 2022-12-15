import { useEffect, useState } from "react";
import styles from "./adminUpdate.module.css";
import Modal from "react-modal";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

  console.log("task", task);

  const submit = async (e) => {
    const res = await addDoc(collection(db, "Tasks"), {
      comments: comments,
      userRef: `users/${userId}`,
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
      <div className={styles.btnEmployee}>
        <button onClick={() => setModalIsOpen(true)} className={styles.admin}>
          Update
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        className={styles.custom}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        arialHideApp={true}
      >
        <h3>Task Employee</h3>
        <div className={styles.maintable}>
          {task?.map((u, i) => {
            return (
              <div key={i} className={styles.table}>
                <table className={styles.table1}>
                  <tr>
                    <td>{u.comments}</td>
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
