import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/shadcn-utils";

export default function SubmitButton({
  text = "Submit",
  buttonClass = "",
  loaderClass = "",
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={buttonClass}>
      {pending && (
        <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", loaderClass)} />
      )}
      {text}
    </Button>
  );
}
