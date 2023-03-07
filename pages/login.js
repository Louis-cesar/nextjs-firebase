import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaEye } from "react-icons/fa";

//toast
import { ToastContainer } from "react-toastify";
import { cusToastSuccess, cusToastError } from "../lib/cusToast";
import "react-toastify/dist/ReactToastify.css";
import { async } from "@firebase/util";

const Login = () => {
  const router = useRouter();
  const { login, forgotPassword } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // check if user has entered email and password
    if (data.email === "") return cusToastError("Please enter your email");
    if (data.password === "")
      return cusToastError("Please enter your password");
    try {
      const result = await login(data.email, data.password);
      if (result) {
        cusToastSuccess("Login successful");
        router.push("/profile");
      }
    } catch (error) {
      switch (error.code) {
        // user not found
        case "auth/user-not-found":
          cusToastError("User not found");
          break;
        // wrong password
        case "auth/wrong-password":
          cusToastError("Wrong password");
          break;
        // connection error
        case "auth/network-request-failed":
          cusToastError("Connection error");
          break;
        // invalid email
        case "auth/invalid-email":
          cusToastError("Invalid email");
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
      <div className={styles.form}>
        <form>
          <h1 className={styles.header1}>Login</h1>
          <div className={styles.Label}>
            <div className={styles.input}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className={styles.wrapper}>
              <input
                name="password"
                id="password"
                placeholder="Password"
                className={styles.password}
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <FaEye className={styles.eye} onClick={togglePasswordVisiblity} />
            </div>

            <button type="submit" className={styles.btn} onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className={styles.btn1}>
            <Link href="/forgotPassword" className={styles.forgot}>
              Forgot Password
            </Link>
            <Link href="/signup" className={styles.signup}>
              Sign Up Here!
            </Link>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
