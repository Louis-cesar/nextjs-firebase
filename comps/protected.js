import { useRouter } from "next/router";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const { User } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!User) {
      router.push("/login");
    }
  }, [router.push, User]);
  return <>{User ? children : null}</>;
};

export default Protected;
