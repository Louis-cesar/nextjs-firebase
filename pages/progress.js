import SidebarLayout from "../comps/sidebarLayout";
import styles from "./progress.module.css";
const Progress = () => {
  return (
    <SidebarLayout>
      <div className={styles.container}>Hello Progress</div>;
    </SidebarLayout>
  );
};

export default Progress;
