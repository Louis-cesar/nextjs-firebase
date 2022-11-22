import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link href="/">
          <p className={styles.header}>
            Tekswipe <span className={styles.color}>Company</span>
          </p>
        </Link>
        <ul className={styles.list}>
          {user ? (
            <>
              <Link href="/dashboard">
                <li>Admin</li>
              </Link>
              <Link href="/profile">
                <li>Profile</li>
              </Link>
              <Link
                href={"/login"}
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <li>Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/signup">
                <li>Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
