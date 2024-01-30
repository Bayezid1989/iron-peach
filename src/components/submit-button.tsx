"use client";

import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/shadcn-utils";

interface Props extends ButtonProps {
  text?: string;
  loaderClass?: string;
}

export default function SubmitButton({
  text = "Submit",
  loaderClass = "",
  ...buttonProps
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...buttonProps}>
      {pending && (
        <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", loaderClass)} />
      )}
      {text}
    </Button>
  );
}
