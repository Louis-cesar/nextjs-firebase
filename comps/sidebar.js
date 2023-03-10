import styles from "./sidebar.module.css";
import Sidebar from "./sidebar";
import { useState } from "react";
import { sidebarData } from "./sidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import Link from "next/link";
const SidebarSlider = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className={styles.navbar}>
        <Link href="#" className={styles.menuBars}>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? styles.navMenuActive : styles.navMenu}>
        <ul className={styles.navMenuItems} onClick={showSidebar}>
          <li className={styles.navbarToggle}>
            <Link href="#" className={styles.menuBars}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={styles.list1}>
                <Link className={styles.list} href={item.path}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SidebarSlider;

//create a css style with overlay file for the sidebar component
