import styles from "./signup.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
//toast
import { ToastContainer } from "react-toastify";
import { cusToastSuccess, cusToastError } from "../lib/cusToast";
import "react-toastify/dist/ReactToastify.css";

import { FaEye } from "react-icons/fa";

const Signin = () => {
  const router = useRouter();
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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
      <div className={styles.form}>
        <form>
          <Image
            src="/img/logo dark bg.png"
            width={150}
            height={150}
            className={styles.logo}
          />
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
            <div className={styles.wrapper}>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className={styles.password}
              />

              <FaEye className={styles.eye} onClick={togglePasswordVisiblity} />
            </div>
            <div>
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
