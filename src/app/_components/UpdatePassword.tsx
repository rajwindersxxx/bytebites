import { useForm } from "react-hook-form";
import { PrimaryButton } from "./Buttons";
import Input from "./Input";
import { UpdatePasswordForm } from "../types/FormData";
import { changePassword } from "../_actions/action";
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
  const newPassword = watch("newPassword"); // Watch newPassword to use in validation
  return (
    <form
      className="grid grid-cols-[0.3fr_1fr] items-center gap-4 py-8"
      onSubmit={handleSubmit((data) => handlePasswordChange(data))}
    >
      <label>Current Password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2"
          placeHolder="Enter current password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
        {errors.currentPassword && (
          <p className="text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      <label>New Password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2"
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

      <label>Confirm password:</label>
      <div className="flex flex-col">
        <Input
          type="password"
          className="p-2"
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
        <PrimaryButton type="submit">Update Password</PrimaryButton>
      </div>
    </form>
  );
}

export default UpdatePassword;
