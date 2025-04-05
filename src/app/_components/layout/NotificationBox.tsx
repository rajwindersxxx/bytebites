import { Toaster } from "react-hot-toast";

function NotificationBox() {
  return (
    <Toaster
      toastOptions={{
        className:
          "!text-primary !dark:text-accent !bg-natural-cream !dark:bg-natural-accent !border-primary !border !dark:border-secondary",
        position: "bottom-center",
      }}
    />
  );
}

export default NotificationBox;
