"use client";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../ui/Buttons";
import Input from "../ui/Input";
import { UpdatePasswordForm } from "../../types/FormData";
import { changePassword } from "@/app/_actions/userActions";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdatePasswordForm>();
  const session = useSession();
  const userId = session.data?.user?.id;
  const { mutate: handlePasswordChange } = useMutation({
    mutationFn: (data: UpdatePasswordForm) =>
      changePassword(data, Number(userId)),
    onSuccess: () => {
      toast.success("password change successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
  });
  const [newPassword, confirmPassword, currentPassword] = watch([
    "newPassword",
    "confirmPassword",
    "currentPassword",
  ]); // Watch newPassword to use in validation
  const isDisabled = !(newPassword && confirmPassword && currentPassword);
  return (
    <form
      className="sm:grid grid-cols-[0.3fr_1fr] items-center gap-4 py-8"
      onSubmit={handleSubmit((data) => handlePasswordChange(data))}
    >
      <label className="inline-block mb-2 sm:auto">Current Password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2 w-full mb-4 sm:mb-auto"
          placeHolder="Enter current password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
        {errors.currentPassword && (
          <p className="text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      <label className="inline-block mb-2 sm:auto">New Password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2 w-full mb-4 sm:mb-auto"
          placeHolder="Enter new password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <label className="inline-block mb-2 sm:auto">Confirm password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2 w-full mb-4 sm:mb-auto"
          placeHolder="Confirm new password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="col-span-2 flex gap-4 justify-self-end">
        <PrimaryButton type="submit" disabled={isDisabled}>
          Update Password
        </PrimaryButton>
      </div>
    </form>
  );
}

export default UpdatePassword;
