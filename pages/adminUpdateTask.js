import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import Modal from "react-modal";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
    const res = await addDoc(collection(db, userId), {
      comments: comments,
    });

    console.log(res, db);
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      const tasksRef = await getDocs(collection(db, userId));
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
        <div>
          {task?.map((u, i) => {
            return (
              <div key={i}>
                <p>{u.comments}</p>
              </div>
            );
          })}
          <h3>Task Employee</h3>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label>Comments</label>
          <input
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
