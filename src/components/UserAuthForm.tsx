"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const signInWithDiscord = async () => {
    setIsLoading(true);

    try {
      await signIn("discord");
    } catch (error) {
      toast({
        title: "Error",
        message: "There was an error logging in with Discord",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        className="max-w-sm w-full bg-slate-200"
        onClick={signInWithDiscord}
        disabled={isLoading}
      >
        Sign in with Discord
      </Button>
    </div>
  );
};

export default UserAuthForm;
