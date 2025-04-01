"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { loginUser } from "@/app/_actions/userActions";
import Input from "../ui/Input";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";
import MiniSpinner from "../ui/MiniSpinner";

type formData = {
  email: string;
  password: string;
};
function LoginForm() {
  const [error, setError] = useState<boolean | string>(false);
  const { update } = useSession();

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const { mutate: handleSignIn, isPending } = useMutation({
    mutationFn: (formData: formData) => loginUser(formData),
    onSuccess: async () => {
      await update(); //its update session before redirecting
      router.replace("/dashboard");
    },
    onError: (error: { message: string }) => {
      console.error("Login error:", error);
      setError(error.message);
      reset();
    },
  });
  return (
    <form
      className="mx-auto w-[20rem]"
      onSubmit={handleSubmit((data) => handleSignIn(data))}
    >
      <h3 className="mb-8 text-center text-2xl text-secondary dark:text-accent">
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
          {isPending ? <MiniSpinner /> : "Log in"}
        </PrimaryButton>
      </div>
      {error && <p className="p-4 text-center text-red-500">{error}</p>}
      <div className="!mt-4">
        <Link href="/signUp">
          <SecondaryButton type="button" className="w-full">
            sign-up
          </SecondaryButton>
        </Link>
      </div>
      {/* <div className="my-4 flex items-center gap-4">
        <hr className="w-full border-gray-300" />
        <p className="text-center text-sm text-gray-800 dark:text-gray-100">
          or
        </p>
        <hr className="w-full border-gray-300" />
      </div>
      <div className="flex justify-center space-x-6">
        <button type="button" className="border-none outline-none">
          <GoogleIcon />
        </button>
      </div> */}
    </form>
  );
}

export default LoginForm;
