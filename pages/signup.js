import styles from "./signup.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

const Signin = () => {
  const router = useRouter();
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.header}>Sign Up</h1>
        <div className={styles.formLgn}>
          <form className={styles.form} onSubmit={handleSignup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={styles.email}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={styles.password}
            />
            <div>
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
