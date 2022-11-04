import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.header}>Login</h1>
        <div className={styles.formLgn}>
          <form className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.email}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.password}
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
