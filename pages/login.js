import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.success("Log Successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    try {
      const result = await login(data.email, data.password);
      if (result) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Enter a valid Email!", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }
  };

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
            <button type="submit" className={styles.btn} onClick={handleLogin}>
              Login
            </button>
            <div className={styles.forgotBtn}>
              <p className={styles.forgot}>Forgot Password?</p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
