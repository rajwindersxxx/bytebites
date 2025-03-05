"use client";
import { useSession } from "next-auth/react";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../_actions/action";
import { UpdateProfileForm } from "../types/FormData";
function UpdateAccount() {
  const {data , update} = useSession();
  const { name, email, id } = data?.user as {
    id: string;
    name: string;
    email: string;
  };
  const { register, handleSubmit, reset } = useForm<UpdateProfileForm>();
  const { mutate: handleUpdate } = useMutation({
    mutationFn: (data: UpdateProfileForm) => updateUser(data),
    onSuccess:async () => {
      console.log("data updated");
      await update();
      console.log(data)
      reset();
    },
    onError: (error) => {
      console.error(error);
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
        <SecondaryButton onClick={reset}>Cancel</SecondaryButton>
        <PrimaryButton>Update account</PrimaryButton>
      </div>
    </form>
  );
}

export default UpdateAccount;
