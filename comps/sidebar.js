import { sidebarData } from "./sidebarData";
import styles from "./sidebar.module.css";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div>
      {sidebarData.map((item, index) => {
        return (
          <li key={index} className={styles.list}>
            <Link href={item.path}>{item.title}</Link>
          </li>
        );
      })}
    </div>
  );
};

export default Sidebar;
