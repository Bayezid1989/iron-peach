import { useToast } from "@/components/ui/use-toast";
import { HandledError } from "@/utils";
import { FirebaseError } from "firebase/app";
import { useCallback } from "react";

export default function useErrorToast() {
  const { toast } = useToast();

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof FirebaseError) {
        toast({ title: error?.code, description: error.message });
      } else if (error instanceof HandledError) {
        toast({ title: error.message });
      } else {
        toast({
          title: "Unexpected Error",
          description: JSON.stringify(error),
        });
      }
    },
    [toast],
  );

  return { handleError };
}
