"use client";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { GoogleIcon } from "./Icons";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { loginUser } from "../_actions/action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import MiniSpinner from "./MiniSpinner";
type formData = {
  email: string;
  password: string;
};
function LoginForm() {
  const router = useRouter();
  const { mutate: handleSignIn, data, isPending } = useMutation({
    mutationFn: (formData: formData) => loginUser(formData),
    onSuccess: () => {
      router.refresh();
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
      reset();
    },
  });
  console.log(data);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  return (
    <form
      className="mx-auto w-[20rem]"
      onSubmit={handleSubmit((data) => handleSignIn(data))}
    >
      <h3 className="mb-8 text-center text-2xl text-secondary">
        Welcome to byteBites
      </h3>
      <div className="space-y-4">
        <Input
          placeHolder="Email"
          type="email"
          className="w-full p-2"
          disabled={isPending}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p>{errors.email.message as string}</p>}
        <Input
          placeHolder="Password"
          type="password"
          className="w-full p-2"
          disabled={isPending}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <p>{errors.password.message as string}</p>}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm"></div>
        </div>
      </div>
      <div className="!mt-1">
        <PrimaryButton type="submit" className="w-full">
         { isPending ? <MiniSpinner/> : 'Log in'}
        </PrimaryButton>
      </div>
      {data && "message" in data && (
        <p className="p-4 text-center text-red-500">{data.message}</p>
      )}
      <div className="!mt-4">
        <Link href="/signUp">
          <SecondaryButton type="button" className="w-full">
            sign-up
          </SecondaryButton>
        </Link>
      </div>
      <div className="my-4 flex items-center gap-4">
        <hr className="w-full border-gray-300" />
        <p className="text-center text-sm text-gray-800">or</p>
        <hr className="w-full border-gray-300" />
      </div>
      <div className="flex justify-center space-x-6">
        <button type="button" className="border-none outline-none">
          <GoogleIcon />
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
