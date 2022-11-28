import styles from "./dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";

const Dashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  console.log("users", users);

  useEffect(() => {
    (async () => {
      const userRef = await getDocs(collection(db, "Users"));
      const usersSnap = userRef.docs.map((u) => u.data());
      setUsers(usersSnap);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const colRef = collection(db, "Users");
  //     const Snapshot = await getDocs(colRef);
  //     const docs = Snapshot.docs.map((doc) => {
  //       const data = doc.data();

  //       data.id = doc.id;
  //       return data;
  //     });
  //     setUsers(docs);
  //   })();
  // }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>Dashboard</li>
          <Link href="/profile">
            <li>Profile</li>
          </Link>
          <li>Diary</li>
          <li>Progress</li>
        </ul>
      </nav>

      <div className={styles.table}>
        <h2 className={styles.admin}>Admin Dashboard</h2>
        <div className={styles.details}>
          <div className={styles.title}>User ID</div>
          <div className={styles.title}>Name</div>
          <div className={styles.title}>Department</div>
          <div className={styles.title}>Status</div>
          <div className={styles.title}>Email</div>
          <div className={styles.title}>Actions</div>
        </div>
        {users?.map((u, i) => {
          return (
            <div className={styles.listItem} key={i}>
              <div className={styles.item}>{u.userId}</div>
              <div className={styles.item}>{u.fullName}</div>
              <div className={styles.item}>{u.department}</div>

              <div className={styles.item}>Active</div>
              <div className={styles.item}>{u.email}</div>
              <div className={styles.btn}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
