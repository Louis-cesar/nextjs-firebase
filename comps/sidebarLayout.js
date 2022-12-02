import Sidebar from "./sidebar";
import styles from "./sidebarlayout.module.css";
const SidebarLayout = ({ children }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.grid1}>
        <Sidebar />
      </div>
      <div className={styles.grid2}>{children}</div>
    </div>
  );
};

export default SidebarLayout;