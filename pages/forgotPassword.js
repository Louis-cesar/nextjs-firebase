import styles from "./forgotPassword.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

//toast
import { ToastContainer } from "react-toastify";
import { cusToastSuccess, cusToastError } from "../lib/cusToast";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [data, setData] = useState({ email: "" });

  const forgotHandler = async () => {
    try {
      const result = await forgotPassword(data.email);
      router.push("/login");
      cusToastSuccess(
        "Check your email for password reset link, if not found in inbox, check spam folder"
      );
      console.log("email sent");
      return result;
    } catch (error) {
      cusToastError("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Forgot Password</h1>
      <label>Enter your Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className={styles.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <button onClick={forgotHandler} className={styles.btn}>
        Send Email
      </button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
