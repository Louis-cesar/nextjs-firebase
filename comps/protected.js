import { useRouter } from "next/router";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router.push]);
  return <>{token ? children : null}</>;
};

export default Protected;
