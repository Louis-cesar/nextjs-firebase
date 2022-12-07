import Cookies from "js-cookie";
import { useRouter } from "next/router";
const AuthRoute = ({ children }) => {
  const router = useRouter();
  const token = Cookies.get("token");

  if (token) {
    router.push("/profile");
  }
  return <div>{children}</div>;
};

export default AuthRoute;
