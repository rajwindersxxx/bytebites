"use client";
import { useSession } from "next-auth/react";
import { PrimaryButton } from "../ui/Buttons";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/app/_actions/userActions";
import { UpdateProfileForm } from "../../types/FormData";
import toast from "react-hot-toast";
function UpdateAccount() {
  const { data, update } = useSession();
  const { register, handleSubmit, reset, watch } = useForm<UpdateProfileForm>();
  const [username, file] = watch(["username", "file"]);
  const isDisabled =
    username === data?.user?.name && (!file || file.length === 0);

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
  if (!data) return null;
  const { name, email, id } = data?.user as {
    id: string;
    name: string;
    email: string;
  };
  function handleFormSubmit(data: UpdateProfileForm) {
    const formObject = { ...data, id: Number(id) };
    handleUpdate(formObject);
  }
  return (
    <form
      className="sm:grid grid-cols-[0.3fr_1fr]  items-center gap-4 py-8"
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
    >
      <label className="inline-block mb-2 sm:auto">Email Address:</label>
      <Input
        type="text"
        className="p-2 w-full mb-4 sm:mb-auto"
        placeHolder="Email Address"
        disabled={true}
        defaultValue={email || ""}
      />
      <label className="inline-block mb-2 sm:auto">Full Name:</label>
      <Input
        type="text"
        className="p-2 w-full mb-4 sm:mb-auto"
        placeHolder="your Full name"
        defaultValue={name || ""}
        {...register("username", { required: true })}
      />
      <label className="inline-block mb-2 sm:auto">Avatar:</label>
      <Input
        type="file"
        className="p-2 w-full mb-4 sm:mb-auto"
        placeHolder="Email Address"
        {...register("file")}
      />
      <div className="col-span-2 flex gap-4 justify-self-end">
        <PrimaryButton type="submit" disabled={isDisabled}>
          Update account
        </PrimaryButton>
      </div>
    </form>
  );
}

export default UpdateAccount;
