import styles from "./dashboard.module.css";
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>List of Employees</li>
          <li>Diary</li>
          <li>Progress</li>
        </ul>
      </nav>
      <div>
        <h2 className={styles.admin}>Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default Dashboard;
