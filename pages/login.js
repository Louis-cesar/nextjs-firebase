import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { async } from "@firebase/util";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(data.email, data.password);
      if (result) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.header}>Login</h1>
        <div className={styles.formLgn}>
          <form className={styles.form} onSubmit={handlelogin}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <div className={styles.forgotBtn}>
              <p className={styles.forgot}>Forgot Password?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
