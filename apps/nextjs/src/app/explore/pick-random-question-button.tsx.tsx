"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { useFormState } from "react-dom";

import { ShuffleIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { toast } from "@feprep/ui/toast";

import { getRandomQuestionId } from "~/utils/actions";

export function PickRandomQuestionButton() {
  const [state, formAction] = useFormState(getRandomQuestionId, undefined);

  const router = useRouter();
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error, state?.randomQuestionId, router]);

  return (
    <form action={formAction}>
      <Button type="submit">
        <ShuffleIcon className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline">Pick Random</span>
      </Button>
    </form>
  );
}
