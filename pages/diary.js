import styles from "./diary.module.css";
import SidebarLayout from "../comps/sidebarLayout";

const Diary = () => {
  return (
    <SidebarLayout>
      <div className={styles.container}> Hi Diary</div>
    </SidebarLayout>
  );
};

export default Diary;
