"use client";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { PrimaryButton } from "../ui/Buttons";
import useUserAuth from "@/app/_hooks/useUserAuth";
import Link from "next/link";
import MiniSpinner from "../ui/MiniSpinner";
import { useState } from "react";
type formData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function SignUpForm() {

  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();
  const { userSignUp, isSignUpPending } = useUserAuth();
  function handleSignUp(data: formData) {
    setRedirecting(true);
    userSignUp(data, {
      onSuccess: () => setRedirecting(false),
      onError: () => {
        setRedirecting(false);
        reset();
      },
    });
  }

  return (
    <div className="flex h-full items-center">
      <form className="mx-auto w-[20rem]" onSubmit={handleSubmit(handleSignUp)}>
        <h3 className="mb-4 text-center text-2xl text-secondary dark:text-accent">
          Welcome to byteBites
        </h3>
        <div className="space-y-4">
          <Input
            placeHolder="Username"
            type="text"
            className="m-0 w-full p-2"
            disabled={isSignUpPending}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="m-0">{errors.username.message as string}</p>
          )}
          <Input
            placeHolder="Email"
            type="email"
            className="w-full p-2"
            disabled={isSignUpPending}
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
            disabled={isSignUpPending}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message as string}</p>}

          <Input
            placeHolder="confirm-password"
            type="password"
            className="w-full p-2"
            disabled={isSignUpPending}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p>{errors.confirmPassword.message as string}</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm"></div>
          </div>
        </div>

        <div className="!mt-1">
          <PrimaryButton type="submit" className="w-full">
            {redirecting ? <MiniSpinner /> : "sign-up"}
          </PrimaryButton>
          {/* {error && <p className="p-4 text-center text-red-500">{error}</p>} */}

          <p className="!mt-4 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="border-accent text-accent transition-all hover:border-b hover:border-b-accent"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
