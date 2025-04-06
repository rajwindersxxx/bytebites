"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../ui/Input";
import { PrimaryButton } from "../ui/Buttons";
import MiniSpinner from "../ui/MiniSpinner";
import useUserAuth from "@/app/_hooks/useUserAuth";
import { SignUpForm } from "@/app/_types/FormData";

function LoginForm() {
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const { userSignIn, isSignPending, error } = useUserAuth();
  function handleSignIn(data: SignUpForm) {
    setRedirecting(true);
    userSignIn(data, {
      onError: () => {
        setRedirecting(false);
      },
      onSuccess: () => {
        setRedirecting(false);
      },
    });
    reset();
  }

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
          disabled={isSignPending}
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
          disabled={isSignPending}
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
          {redirecting ? <MiniSpinner /> : "Log in"}
        </PrimaryButton>
      </div>
      {error && <p className="p-4 text-center text-red-500">{error}</p>}
      <p className="!mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signUp"
          className="border-accent text-accent transition-all hover:border-b hover:border-b-accent"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
