import styles from "./signup.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
//toast
import { ToastContainer } from "react-toastify";
import { cusToastSuccess, cusToastError } from "../lib/cusToast";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const router = useRouter();
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    // check if user has entered email and password
    if (data.email === "") return cusToastError("Please enter your email");
    if (data.password === "")
      return cusToastError("Please enter your password");

    try {
      await signup(data.email, data.password);
      if (user) {
      }
      cusToastSuccess("SignUp successful");
      router.push("/profile");
    } catch (error) {
      switch (error.code) {
        // connection error
        case "auth/network-request-failed":
          cusToastError("Connection error");
          break;
        // default
        default:
          cusToastError("Something went wrong");
          break;
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignup}>
        <h1 className={styles.header1}>Sign Up</h1>
        <div className={styles.Label}>
          <div className={styles.input}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={styles.email}
            />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className={styles.password}
          />
          <div>
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
