import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import Modal from "react-modal";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const customStyles = {
  overlay: {
    background: "transparent",
  },
};
const AdminUpdate = ({ userId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fullName, setfullName] = useState("");
  const [department, setDepartment] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const { user } = useAuth();

  const submit = async (e) => {
    const res = await updateDoc(doc(db, "Users", userId), {
      fullName: fullName,
      department: department,
    });

    console.log(res, db);
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.btnEmployee}>
        {/* {isUpdate ? (
          <button
            onClick={() => setModalIsOpen(true)}
            className={styles.updateProfile}
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={() => setModalIsOpen(true)}
            className={styles.updateProfile}
          >
            Add Employee
          </button>
        )}
      </div> */}
        <button onClick={() => setModalIsOpen(true)} className={styles.admin}>
          Edit
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        className={styles.custom}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        arialHideApp={true}
      >
        <div>Edit Employee</div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter FullName"
            className={styles.name}
            value={fullName}
            onChange={({ target }) => setfullName(target?.value)}
            required
          />

          <label className={styles.label}>Department:</label>
          <input
            type="text"
            name="contact"
            placeholder="Enter Department"
            className={styles.name}
            value={department}
            onChange={({ target }) => setDepartment(target?.value)}
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

export default AdminUpdate;
