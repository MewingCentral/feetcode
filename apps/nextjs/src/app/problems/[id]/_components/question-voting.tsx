"use client";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";
import { toast } from "@feprep/ui/toast";

import { api } from "~/trpc/react";

export function QuestionVoting({
  user,
  question,
}: {
  user: User;
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const vote = api.questions.vote.useMutation({
    onSuccess: ({ isNewVote }) => {
      if (isNewVote) {
        toast("Thanks for voting!");
      } else {
        toast("Updated your vote!");
      }
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  return (
    <div className="mb-4">
      <div className="mb-2">What you think about this question?</div>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-green-500 text-white hover:bg-green-600"
          onClick={() => {
            if (!user) return toast("You must be logged in to vote");
            if (!user.emailVerified)
              return toast("You must verify your email to vote");
            vote.mutate({ vote: "easy", questionId: question.id });
          }}
        >
          Easy
        </Button>
        <Button
          size="sm"
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => {
            if (!user) return toast("You must be logged in to vote");
            if (!user.emailVerified)
              return toast("You must verify your email to vote");
            vote.mutate({ vote: "medium", questionId: question.id });
          }}
        >
          Medium
        </Button>
        <Button
          size="sm"
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            if (!user) return toast("You must be logged in to vote");
            if (!user.emailVerified)
              return toast("You must verify your email to vote");
            vote.mutate({ vote: "hard", questionId: question.id });
          }}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
