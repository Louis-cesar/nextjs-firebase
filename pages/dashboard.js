import styles from "./dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import AdminUpdateTask from "./AdminUpdateTask";
import AdminUpdate from "./adminUpdate";
import SidebarLayout from "../comps/sidebarLayout";
import AdminSwitch from "./adminSwitch";

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

  const deleteAccount = async (e) => {
    const res = await deleteDoc(doc(db, "Users", e.userId));
    window.location.reload();
  };

  const handleSwitch = async (userId, isAdmin) => {
    const res = await updateDoc(doc(db, "Users", userId), {
      isAdmin: isAdmin,
    });
    console.log("res", res);
  };

  return (
    <SidebarLayout>
      <div className={styles.container}>
        <h2 className={styles.admin}>Admin Dashboard</h2>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.table}>User ID</th>
              <th className={styles.table}>Name</th>
              <th className={styles.table}>Department</th>
              <th className={styles.table}>Status</th>
              <th className={styles.table}>Email</th>
              <th className={styles.table}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {users?.map((u, i) => {
              return (
                <tr key={i}>
                  <td className={styles.table}>{u.userId}</td>
                  <td className={styles.table}>{u.fullName}</td>
                  <td className={styles.table}>{u.department}</td>
                  <td className={styles.table}>
                    <AdminSwitch
                      userId={u.userId}
                      isAdmin={u.isAdmin}
                      handleSwitch={handleSwitch}
                    />
                  </td>
                  <td className={styles.table}>{u.email}</td>
                  <td className={styles.table}>
                    <button className={styles.button}>
                      <AdminUpdate userId={u.userId} />
                    </button>
                    <button className={styles.button}>
                      <AdminUpdateTask userId={u.userId} />
                    </button>
                    <button
                      onClick={() => deleteAccount(u)}
                      className={styles.delete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
