import styles from "./dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";
import AdminUpdate from "./adminUpdate";
import SidebarLayout from "../comps/sidebarLayout";

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
    <SidebarLayout>
      <div className={styles.container}>
        <h2 className={styles.admin}>Admin Dashboard</h2>
        <div className={styles.details}>
          <div className={styles.title}>User ID</div>
          <div className={styles.title}>Name</div>
          <div className={styles.title}>Department</div>
          <div className={styles.title}>Status</div>
          <div className={styles.title}>Email</div>
          <div className={styles.title}>Actions</div>
        </div>
        <div>
          {users?.map((u, i) => {
            return (
              <div className={styles.listItem} key={i}>
                <div className={styles.item}>{u.userId}</div>
                <div className={styles.item}>{u.fullName}</div>
                <div className={styles.item}>{u.department}</div>
                <div className={styles.item}>{u.email}</div>
                <div className={styles.btn}>
                  <button className={styles.button}>
                    <AdminUpdate />
                  </button>
                  <button className={styles.button1}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
