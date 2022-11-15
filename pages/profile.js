import styles from "./profile.module.css";
import Image from "next/image";
import Edit from "./edit";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
const Profile = () => {
  const { User } = useAuth();
  const [data, setData] = useState(null);
  const currentUser = auth.currentUser;
  console.log("data", data);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
      }
    })();
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Employee Profile</h2>
      <main className={styles.main}>
        <div className={styles.container1}>
          <Image
            src="/img/profile.jpg"
            width={100}
            height={100}
            className={styles.img}
          />
          <h3 className={styles.name}>Louis Cesar</h3>
          <p className={styles.position}>FullStack Developer</p>
        </div>
        <div className={styles.box}>
          <div className={styles.box1}>
            <h4 className={styles.header1}>Personal Details</h4>
          </div>

          <div className={styles.listItem}>
            <ul className={styles.list}>
              <li>FullName: {data?.fullName}</li>
              <li>Address: {data?.address}</li>
              <li>Email: {User?.email}</li>
              <li>PhoneNumber: {data?.phoneNumber}</li>
              <li>Date of Birth:</li>
              <li>Gender:</li>
            </ul>
          </div>
          <div className={styles.edit}>
            <Edit />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
