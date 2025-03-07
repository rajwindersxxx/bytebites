"use client";
import { useSession } from "next-auth/react";
import { PrimaryButton } from "./Buttons";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../_actions/action";
import { UpdateProfileForm } from "../types/FormData";
import toast from "react-hot-toast";
function UpdateAccount() {
  const { data, update } = useSession();
  const { name, email, id } = data?.user as {
    id: string;
    name: string;
    email: string;
  };
  const { register, handleSubmit, reset } = useForm<UpdateProfileForm>();
  const { mutate: handleUpdate } = useMutation({
    mutationFn: (data: UpdateProfileForm) => updateUser(data),
    onSuccess: async () => {
      await update();
      toast.success("Account has been updated ");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function handleFormSubmit(data: UpdateProfileForm) {
    const formObject = { ...data, id: Number(id) };
    handleUpdate(formObject);
  }
  return (
    <form
      className="grid grid-cols-[0.3fr_1fr] items-center gap-4 py-8"
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
    >
      <label>Email Address:</label>
      <Input
        type="text"
        className="p-2"
        placeHolder="Email Address"
        disabled={true}
        defaultValue={email || ""}
      />
      <label>Full Name:</label>
      <Input
        type="text"
        className="p-2"
        placeHolder="your Full name"
        defaultValue={name || ""}
        {...register("username", { required: true })}
      />
      <label>Avatar:</label>
      <Input
        type="file"
        className="p-2"
        placeHolder="Email Address"
        {...register("file")}
      />
      <div className="col-span-2 flex gap-4 justify-self-end">

        <PrimaryButton type="submit">Update account</PrimaryButton>
      </div>
    </form>
  );
}

export default UpdateAccount;
