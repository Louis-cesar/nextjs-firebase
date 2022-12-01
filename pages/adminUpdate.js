import { useState } from "react";
import styles from "./admin.module.css";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    background: "transparent",
  },
};
const AdminUpdate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)} className={styles.admin}>
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        className={styles.custom}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
        arialHideApp={true}
      >
        <div>Update</div>
      </Modal>
    </div>
  );
};

export default AdminUpdate;
