import styles from "./dashboard.module.css";
import Link from "next/link";
const Dashboard = () => {
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
      <div className={styles.dashboard}>
        <h2 className={styles.admin}>Admin Dashboard</h2>
        <div className={styles.box}>
          <div className={styles.listTitle}>
            <div className={styles.title}>User ID</div>
            <div className={styles.title}>Name</div>
            <div className={styles.title}>Department</div>
            <div className={styles.title}>At Work</div>
            <div className={styles.title}>Status</div>
            <div className={styles.title}>Actions</div>
          </div>
          <div className={styles.employee}>
            <div className={styles.employees}>2323</div>
            <div className={styles.employees}>Louis Cesar</div>
            <div className={styles.employees}>Next Js</div>
            <div className={styles.employees}>8 Months</div>
            <div className={styles.active}>Active</div>
            <div className={styles.btn}>
              <button className={styles.btnemployees}>Edit</button>
              <button className={styles.btnemployees2}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
