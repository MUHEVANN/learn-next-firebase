import InputLabel from "@/components/InputLabel";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();

  const handlerRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const target = e.target as HTMLFormElement;
    const data = {
      fullname: target.fullname.value,
      email: target.email.value,
      password: target.password.value,
    };
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already exist");
    }
  };

  return (
    <div className="w-full h-screen grid place-content-center  ">
      <div className="bg-white p-5 w-[400px]">
        <h1 className="text-center font-semibold text-[20px] mb-3">Register</h1>
        <form className="flex flex-col gap-2" onSubmit={handlerRegister}>
          <InputLabel
            label="fullname"
            inputProps={{
              type: "text",
              name: "fullname",
            }}
          />
          <InputLabel
            label="phone"
            inputProps={{
              type: "text",
              name: "phone",
            }}
          />
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

export default RegisterView;
