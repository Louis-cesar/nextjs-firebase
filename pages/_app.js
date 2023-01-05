import Navbar from "../comps/navbar";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import Protected from "../comps/protected";
import { ToastContainer } from "react-toastify";
import Login from "./login";
import AuthRoute from "../comps/AuthRoute";

const noAthRequired = ["/login", "/signup", "/forgotPassword"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Navbar />

      {noAthRequired.includes(router.pathname) ? (
        <AuthRoute>
          <Component {...pageProps} />
        </AuthRoute>
      ) : (
        <Protected>
          <Component {...pageProps} />
        </Protected>
      )}
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default MyApp;
