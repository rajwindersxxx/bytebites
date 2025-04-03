"use client";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/_actions/userActions";
import Input from "../ui/Input";
import { PrimaryButton } from "../ui/Buttons";
type formData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();
  const { mutate: handleSignUpData } = useMutation({
    mutationFn: (signupData: formData) => signUpUser(signupData),
    onError: (error: unknown) => {
      console.error("Signup error:", error);
      reset();
      router.replace("/login");
    },
    onSuccess: () => {
      reset();
    },
  });
  function handleSignUp(data: formData) {
    handleSignUpData(data);
    router.push("/login");
  }
  return (
    <div className="flex h-full items-center ">
      <form className="mx-auto w-[20rem]" onSubmit={handleSubmit(handleSignUp)}>
        <h3 className="mb-4 text-center text-2xl text-secondary dark:text-accent">
          Welcome to byteBites
        </h3>
        <div className="space-y-4">
          <Input
            placeHolder="Username"
            type="text"
            className="m-0 w-full p-2"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="m-0">{errors.username.message as string}</p>
          )}
          <Input
            placeHolder="Email"
            type="email"
            className="w-full p-2"
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
            sign-up
          </PrimaryButton>
        </div>
        {/* <div className="my-4 flex items-center gap-4">
          <hr className="w-full border-gray-300" />
          <p className="text-center text-sm text-gray-800">or</p>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="flex justify-center space-x-6">
          <button type="button" className="border-none outline-none">
            <GoogleIcon />
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default SignUpForm;
