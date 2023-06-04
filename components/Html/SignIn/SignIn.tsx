import { signIn, useSession } from "next-auth/react";
import s from "./signin.module.scss";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { store } from "@/store";

const SignIn = () => {
  const { data, status } = useSession();

  useEffect(() => {
    store.user = data?.user;
  }, [data]);

  return (
    <div className={s.login}>
      {status === "loading" ? (
        <h1>Checking User Account...</h1>
      ) : status === "authenticated" ? (
        <h1>User Sign In</h1>
      ) : (
        <button onClick={() => signIn("google")} className={s.login_google}>
          <FcGoogle />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default SignIn;
