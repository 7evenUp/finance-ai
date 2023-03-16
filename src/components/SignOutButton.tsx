"use client";

import { signIn, signOut } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/components/ui/Button";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);


  const signOut = async () => {
    setIsLoading(true)

    try {
      await signOut()
    } catch (error) {
      // toast({
      //   title: 'Error signing out',
      //   message: 'Please try again later',
      //   type: 'error'
      // })
    }
  }

  return (
    <Button onClick={signOut} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
