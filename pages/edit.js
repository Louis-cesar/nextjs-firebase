import Modal from "react-modal";
import { useState } from "react";
import styles from "./edit.module.css";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const customStyles = {
  overlay: {
    background: "transparent",
  },
};

const Edit = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fullName, setfullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const { User } = useAuth();

  const submit = async (e) => {
    const res = await setDoc(doc(db, "Users", User.uid), {
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      timeStamp: serverTimestamp(),
    });
    console.log(res, db);
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className={styles.updateProfile}
      >
        Update Profile
      </button>

      <Modal
        isOpen={modalIsOpen}
        className={styles.custom}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        arialHideApp={true}
      >
        <h2 className={styles.header}>Profile Edit</h2>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label className={styles.label}>FullName:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter FullName"
            className={styles.name}
            value={fullName}
            onChange={({ target }) => setfullName(target?.value)}
          />
          <label className={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            className={styles.name}
            value={address}
            onChange={({ target }) => setAddress(target?.value)}
          />
          <label className={styles.label}>Contact:</label>
          <input
            type="text"
            name="contact"
            placeholder="Enter Contact"
            className={styles.name}
            value={phoneNumber}
            onChange={({ target }) => setphoneNumber(target?.value)}
          />
          <div className={styles.btn}>
            <button
              className={styles.btnClose}
              onClick={() => setModalIsOpen(false)}
            >
              Close
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

export default Edit;
