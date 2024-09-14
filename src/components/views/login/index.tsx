import InputLabel from "@/components/InputLabel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handlerRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const target = e.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: target.email.value,
        password: target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        target.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is wrong");
      }
    } catch (e) {
      setIsLoading(false);
      setError("Email or password is wrong");
    }
  };

  return (
    <div className="w-full h-screen grid place-content-center  ">
      <div className="bg-white p-5 w-[400px]">
        <h1 className="text-center font-semibold text-[20px] mb-3">Register</h1>
        <form className="flex flex-col gap-2" onSubmit={handlerRegister}>
          <InputLabel
            label="email"
            inputProps={{
              type: "text",
              name: "email",
            }}
          />
          <InputLabel
            label="password"
            inputProps={{
              type: "text",
              name: "password",
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-black text-white py-2 mt-3">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-3">
          Have an account?
          <span className="text-blue-500 hover:cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
