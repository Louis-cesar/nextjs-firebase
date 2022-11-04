import Navbar from "../comps/navbar";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}

export default MyApp;
