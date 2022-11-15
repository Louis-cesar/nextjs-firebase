import Navbar from "../comps/navbar";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import Protected from "../comps/protected";

const noAthRequired = ["/login", "/signup"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Navbar />
      {noAthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Protected>
          <Component {...pageProps} />
        </Protected>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
