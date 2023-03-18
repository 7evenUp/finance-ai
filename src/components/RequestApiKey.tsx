"use client";

import { createApiKey } from "@/helpers/create-api-key";
import { FormEvent, useState } from "react";
import { toast } from "@/components/ui/Toast";
import LargeHeading from "@/components/ui/LargeHeading";
import Icons from "@/components/Icons";
import Paragraph from "@/components/ui/Paragraph";
import CopyButton from "./CopyButton";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });

        return;
      }

      toast({
        message: "Something went wrong",
        title: "Error",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Icons.Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading>Request your API Key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadom-sm sm:min-w-0 sm:flex-1">
          {apiKey && (
            <CopyButton
              valueToCopy={apiKey}
              type="button"
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          )}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here"
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
