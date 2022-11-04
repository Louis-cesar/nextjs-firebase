import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link href="/">
          <p className={styles.header}>
            Tekswipe <span className={styles.color}>Company</span>
          </p>
        </Link>
        <ul className={styles.list}>
          <Link href="/dashboard">
            <li>Admin Dashboard</li>
          </Link>
          <Link href="/profile">
            <li>Profile</li>
          </Link>
          <Link href="/login">
            <li>Login</li>
          </Link>
          <Link href="/signup">
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
